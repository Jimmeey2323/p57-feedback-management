import React, { useState, useRef, useEffect } from 'react';
import { momenceAPI } from '../../services/momenceAPI';

interface CustomerSearchWidgetProps {
  onCustomerSelect: (customer: any) => void;
  formData: any;
  setFormData: (data: any) => void;
}

export const CustomerSearchWidget: React.FC<CustomerSearchWidgetProps> = ({
  onCustomerSelect,
  formData,
  setFormData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasRequiredEnvVars = !!(
      process.env.REACT_APP_MOMENCE_AUTH_TOKEN &&
      process.env.REACT_APP_MOMENCE_USERNAME &&
      process.env.REACT_APP_MOMENCE_PASSWORD
    );
    setApiAvailable(hasRequiredEnvVars);
  }, []);

  useEffect(() => {
    if (!apiAvailable || searchQuery.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await momenceAPI.searchCustomers(searchQuery);
        setSearchResults(results || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, apiAvailable]);

  const handleCustomerSelect = async (customer: any) => {
    const displayCustomer = {
      ...customer,
      name: `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email || 'Unknown Customer'
    };
    
    setSelectedCustomer(displayCustomer);
    setShowResults(false);
    setSearchQuery('');
    setIsCollapsed(false);
    setIsLoadingDetails(true);

    try {
      const fullCustomer = await momenceAPI.getCustomerById(customer.id);
      const formattedCustomer = momenceAPI.formatCustomerData(fullCustomer);
      
      setSelectedCustomer({
        ...displayCustomer,
        ...formattedCustomer,
        name: `${formattedCustomer.firstName} ${formattedCustomer.lastName}`.trim()
      });
      
      // Update form data
      setFormData({
        ...formData,
        customerName: `${formattedCustomer.firstName} ${formattedCustomer.lastName}`.trim(),
        customerEmail: formattedCustomer.email,
        customerPhone: formattedCustomer.phone,
        momenceCustomerId: formattedCustomer.id,
        membershipStatus: formattedCustomer.membershipStatus,
        totalBookings: formattedCustomer.totalBookings || 0,
      });

      onCustomerSelect(formattedCustomer);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const clearSelection = () => {
    setSelectedCustomer(null);
    setIsExpanded(false);
    setFormData({
      ...formData,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      momenceCustomerId: '',
      membershipStatus: '',
      totalBookings: 0,
    });
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setShowManualEntry(false);
    setFormData({
      ...formData,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      momenceCustomerId: '',
      membershipStatus: '',
      totalBookings: 0,
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-br from-[#005dff] via-[#0400ff] to-[#00339b] backdrop-blur-sm p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Customer Information</h3>
            <p className="text-[#e5e5e5] text-sm">Search Momence database or enter manually</p>
          </div>
        </div>
        <button type="button" className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-300 border border-white/10 backdrop-blur-sm">
          <svg className={`w-5 h-5 transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-6">
          {!selectedCustomer && !showManualEntry ? (
            <>
              {/* Search Section */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  🔍 Search Customer Database
                </label>
                
                {!apiAvailable && (
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-amber-800 text-sm font-medium">Customer search unavailable - missing API configuration</span>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="w-full px-4 py-3 pl-12 border border-slate-300/30 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/70 backdrop-blur-sm transition-all shadow-sm hover:shadow-md"
                    disabled={!apiAvailable}
                  />
                  <div className="absolute left-4 top-3.5">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    ) : (
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                {showResults && (
                  <div className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-xl border border-slate-300/30 rounded-xl shadow-xl max-h-64 overflow-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((customer, index) => (
                        <div
                          key={index}
                          onClick={() => handleCustomerSelect(customer)}
                          className="p-4 hover:bg-blue-50/80 hover:backdrop-blur-sm cursor-pointer border-b border-slate-100/50 last:border-b-0 transition-all duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-slate-900">
                                {`${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email}
                              </div>
                              <div className="text-sm text-slate-600">{customer.email}</div>
                              {customer.phoneNumber && <div className="text-sm text-slate-500">{customer.phoneNumber}</div>}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-500">
                        No customers found. Try a different search term.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleManualEntry}
                  className="w-full px-4 py-3 bg-gradient-to-r from-slate-100/80 to-blue-100/80 hover:from-slate-200/80 hover:to-blue-200/80 text-slate-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Enter Customer Details Manually
                </button>
              </div>
            </>
          ) : selectedCustomer ? (
            /* Customer Profile - Collapsed by Default */
            <div className="space-y-4">
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="text-slate-600 text-sm">Loading customer data...</span>
                  </div>
                </div>
              )}
              
              {/* Essential Customer Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {selectedCustomer.pictureUrl ? (
                        <img 
                          src={selectedCustomer.pictureUrl} 
                          alt={selectedCustomer.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm">
                          {selectedCustomer.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        selectedCustomer.membershipStatus === 'active' ? 'bg-emerald-500' : 
                        selectedCustomer.membershipStatus === 'frozen' ? 'bg-blue-500' :
                        selectedCustomer.membershipStatus === 'expired' ? 'bg-red-500' : 'bg-slate-400'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold text-slate-900">{selectedCustomer.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedCustomer.membershipStatus === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                          selectedCustomer.membershipStatus === 'frozen' ? 'bg-blue-100 text-blue-700' :
                          selectedCustomer.membershipStatus === 'expired' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {(selectedCustomer.membershipStatus || 'inactive').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{selectedCustomer.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-blue-600">{selectedCustomer.totalVisits || 0} visits</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="truncate">{selectedCustomer.phone || 'No phone'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-medium text-purple-600">{selectedCustomer.totalSessions || 0} sessions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200"
                      title={isExpanded ? 'Collapse details' : 'View full details'}
                    >
                      <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
                      title="Clear selection"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-6">
                    {/* Enhanced Activity Overview */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm">
                      <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>
                        Activity Overview
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-blue-600 mb-1">{selectedCustomer.totalVisits || 0}</div>
                          <div className="text-sm text-slate-600">Total Visits</div>
                          <div className="text-xs text-slate-500 mt-1">All time</div>
                        </div>
                        <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-emerald-600 mb-1">{selectedCustomer.totalBookings || 0}</div>
                          <div className="text-sm text-slate-600">Bookings</div>
                          <div className="text-xs text-slate-500 mt-1">Classes booked</div>
                        </div>
                        <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-purple-600 mb-1">{selectedCustomer.totalSessions || 0}</div>
                          <div className="text-sm text-slate-600">Sessions</div>
                          <div className="text-xs text-slate-500 mt-1">Completed</div>
                        </div>
                        <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-orange-600 mb-1">{selectedCustomer.activeMemberships?.length || 0}</div>
                          <div className="text-sm text-slate-600">Active Plans</div>
                          <div className="text-xs text-slate-500 mt-1">Current</div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Membership Details */}
                    {selectedCustomer.currentMembershipName && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-sm">
                        <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Current Membership
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                              <span className="text-slate-600 font-medium">Plan Name:</span>
                              <span className="font-semibold text-slate-900">{selectedCustomer.currentMembershipName}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                              <span className="text-slate-600 font-medium">Type:</span>
                              <span className="capitalize font-semibold text-slate-900">{selectedCustomer.currentMembershipType || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                              <span className="text-slate-600 font-medium">Started:</span>
                              <span className="font-semibold text-slate-900">{formatDate(selectedCustomer.membershipStartDate)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-slate-600 font-medium">Valid Until:</span>
                              <span className="font-semibold text-slate-900">{formatDate(selectedCustomer.membershipEndDate)}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {selectedCustomer.sessionsLimit && (
                              <div className="bg-slate-50 rounded-xl p-4">
                                <div className="text-sm text-slate-600 mb-2">Session Usage</div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">{selectedCustomer.sessionsUsed || 0} / {selectedCustomer.sessionsLimit}</span>
                                  <span className="text-sm text-slate-500">
                                    {Math.round(((selectedCustomer.sessionsUsed || 0) / selectedCustomer.sessionsLimit) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(((selectedCustomer.sessionsUsed || 0) / selectedCustomer.sessionsLimit) * 100, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            {selectedCustomer.appointmentsLimit && (
                              <div className="bg-slate-50 rounded-xl p-4">
                                <div className="text-sm text-slate-600 mb-2">Appointment Usage</div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">{selectedCustomer.appointmentsUsed || 0} / {selectedCustomer.appointmentsLimit}</span>
                                  <span className="text-sm text-slate-500">
                                    {Math.round(((selectedCustomer.appointmentsUsed || 0) / selectedCustomer.appointmentsLimit) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(((selectedCustomer.appointmentsUsed || 0) / selectedCustomer.appointmentsLimit) * 100, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            {selectedCustomer.creditsLeft && (
                              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                <div className="text-sm text-amber-700 font-medium">Credits Remaining</div>
                                <div className="text-2xl font-bold text-amber-800">{selectedCustomer.creditsLeft}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Recent Activity */}
                    {selectedCustomer.recentSessions?.length > 0 && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-sm">
                        <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                          </svg>
                          Recent Activity
                        </h5>
                        <div className="space-y-3">
                          {selectedCustomer.recentSessions.slice(0, 5).map((session: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${
                                  session.checkedIn ? 'bg-emerald-500' : session.cancelledAt ? 'bg-red-500' : 'bg-blue-500'
                                }`}></div>
                                <div>
                                  <div className="font-semibold text-slate-900">{session.session?.name || 'Unknown Session'}</div>
                                  <div className="text-sm text-slate-600">
                                    {session.session?.teacher ? `with ${session.session.teacher.firstName} ${session.session.teacher.lastName}` : ''}
                                  </div>
                                  <div className="text-xs text-slate-500">{formatDate(session.session?.startsAt)}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  session.checkedIn ? 'bg-emerald-100 text-emerald-700' : 
                                  session.cancelledAt ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {session.checkedIn ? 'Attended' : session.cancelledAt ? 'Cancelled' : 'Booked'}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {session.session?.durationInMinutes ? `${session.session.durationInMinutes}min` : ''}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Customer Tags */}
                    {selectedCustomer.customerTags?.length > 0 && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-sm">
                        <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Customer Tags
                        </h5>
                        <div className="flex flex-wrap gap-3">
                          {selectedCustomer.customerTags.map((tag: any, index: number) => (
                            <span
                              key={index}
                              className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm"
                              style={{ backgroundColor: tag.badgeColor ? tag.badgeColor + '20' : '#e2e8f020', color: tag.badgeColor || '#64748b' }}
                            >
                              <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: tag.badgeColor || '#64748b' }}
                              ></div>
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visit Statistics */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-sm">
                      <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>
                        Visit Statistics
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                          <div className="text-2xl font-bold text-indigo-600">{selectedCustomer.totalAppointments || 0}</div>
                          <div className="text-sm text-slate-600">Appointments</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                          <div className="text-2xl font-bold text-emerald-600">{selectedCustomer.appointmentVisits || 0}</div>
                          <div className="text-sm text-slate-600">Apt. Visits</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{selectedCustomer.bookingVisits || 0}</div>
                          <div className="text-sm text-slate-600">Booking Visits</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                          <div className="text-2xl font-bold text-purple-600">{selectedCustomer.openAreaVisits || 0}</div>
                          <div className="text-sm text-slate-600">Open Area</div>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="text-sm text-slate-600">
                          Last visit: <span className="font-semibold">{formatDate(selectedCustomer.lastSeen || selectedCustomer.lastVisit)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Member Timeline */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-sm">
                      <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Member Timeline
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">First Seen</div>
                          <div className="font-semibold text-emerald-700">{formatDate(selectedCustomer.firstSeen || selectedCustomer.joinDate)}</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Last Visit</div>
                          <div className="font-semibold text-blue-700">{formatDate(selectedCustomer.lastSeen || selectedCustomer.lastVisit)}</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Activity Level</div>
                          <div className="font-semibold text-purple-700 capitalize">{selectedCustomer.activityLevel || 'New'} Member</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Manual Entry Form */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">Manual Customer Entry</h4>
                <button
                  type="button"
                  onClick={handleClearCustomer}
                  className="text-slate-400 hover:text-slate-600 text-sm"
                >
                  ← Back to search
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.customerEmail || ''}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.customerPhone || ''}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Membership Status</label>
                  <select
                    value={formData.membershipStatus || ''}
                    onChange={(e) => setFormData({ ...formData, membershipStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="frozen">Frozen</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};