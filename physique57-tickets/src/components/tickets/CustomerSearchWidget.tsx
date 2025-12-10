import React, { useState, useEffect, useRef } from 'react';
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
        setSearchResults(results);
        setShowResults(results.length > 0);
      } catch (error) {
        setSearchResults([]);
        setShowResults(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      
      setFormData({
        ...formData,
        momenceCustomerId: formattedCustomer.id,
        customerName: `${formattedCustomer.firstName} ${formattedCustomer.lastName}`.trim(),
        customerEmail: formattedCustomer.email,
        customerPhone: formattedCustomer.phone,
        membershipStatus: formattedCustomer.membershipStatus,
        totalBookings: formattedCustomer.totalBookings,
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
    setShowManualEntry(false);
    setSearchQuery('');
    setFormData({
      ...formData,
      momenceCustomerId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      membershipStatus: '',
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getActivityLevelColor = (level: string) => {
    const colors = {
      new: 'bg-slate-100 text-slate-700',
      beginner: 'bg-blue-100 text-blue-700',
      regular: 'bg-emerald-100 text-emerald-700',
      frequent: 'bg-violet-100 text-violet-700',
      vip: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
    };
    return colors[level as keyof typeof colors] || colors.new;
  };

  const getMembershipStatusColor = (status: string) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      frozen: 'bg-blue-100 text-blue-700',
      expired: 'bg-red-100 text-red-700',
      inactive: 'bg-slate-100 text-slate-700'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Customer Information</h3>
            <p className="text-blue-200 text-sm">Search Momence database or enter manually</p>
          </div>
        </div>
        <button type="button" className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200">
          <svg className={`w-5 h-5 transform transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="flex items-center gap-3 text-amber-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm font-medium">Customer search unavailable</span>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">API credentials not configured. Use manual entry below.</p>
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={apiAvailable ? "Search by name, email, or phone..." : "Search disabled - use manual entry"}
                    disabled={!apiAvailable}
                    className={`w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      !apiAvailable ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'
                    }`}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                {/* Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
                    {searchResults.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleCustomerSelect(customer)}
                        className="w-full px-4 py-4 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {`${customer.firstName || ''} ${customer.lastName || ''}`.trim().charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">
                              {`${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email || 'Unknown Customer'}
                            </div>
                            <div className="text-sm text-slate-600">{customer.email}</div>
                            <div className="text-sm text-slate-500">{customer.phoneNumber || customer.phone}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                {customer.visits?.total || 0} visits
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Manual Entry Option */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowManualEntry(true)}
                  className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Enter Customer Details Manually
                </button>
              </div>
            </>
          ) : selectedCustomer ? (
            /* Comprehensive Customer Profile */
            <div className="space-y-6">
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="text-slate-600">Loading comprehensive customer data...</span>
                  </div>
                </div>
              )}
              
              {/* Customer Header Card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {selectedCustomer.pictureUrl ? (
                        <img 
                          src={selectedCustomer.pictureUrl} 
                          alt={selectedCustomer.name} 
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {selectedCustomer.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white shadow-sm ${
                        selectedCustomer.membershipStatus === 'active' ? 'bg-emerald-500' : 
                        selectedCustomer.membershipStatus === 'frozen' ? 'bg-blue-500' :
                        selectedCustomer.membershipStatus === 'expired' ? 'bg-red-500' : 'bg-slate-400'
                      }`}></div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-1">{selectedCustomer.name}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedCustomer.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{selectedCustomer.phone || 'No phone'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H6a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-2M8 7h8" />
                          </svg>
                          <span>Member since {formatDate(selectedCustomer.firstSeen || selectedCustomer.joinDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-3 transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getMembershipStatusColor(selectedCustomer.membershipStatus || 'inactive')}`}>
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedCustomer.membershipStatus === 'active' ? 'bg-emerald-500' : 
                        selectedCustomer.membershipStatus === 'frozen' ? 'bg-blue-500' :
                        selectedCustomer.membershipStatus === 'expired' ? 'bg-red-500' : 'bg-slate-500'
                      }`}></div>
                      {(selectedCustomer.membershipStatus || 'inactive').toUpperCase()}
                    </span>
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getActivityLevelColor(selectedCustomer.activityLevel || 'new')}`}>
                    {(selectedCustomer.activityLevel || 'new').toUpperCase()} MEMBER
                  </span>
                  {selectedCustomer.customerTags?.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                      style={{ backgroundColor: tag.badgeColor + '20', color: tag.badgeColor }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.badgeColor }}></div>
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Activity Stats Grid */}
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

              {/* Membership Details */}
              {selectedCustomer.currentMembershipName && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
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
                        <span className="capitalize font-semibold text-slate-900">{selectedCustomer.currentMembershipType}</span>
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
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
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

              {/* Custom Fields */}
              {selectedCustomer.customerFields?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Additional Information
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCustomer.customerFields.map((field: any, index: number) => (
                      <div key={index} className="flex justify-between py-3 border-b border-slate-100 last:border-b-0">
                        <span className="text-slate-600 font-medium">{field.label}:</span>
                        <span className="font-semibold text-slate-900">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visit Statistics */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  Visit Statistics
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-indigo-600">{selectedCustomer.totalAppointments || 0}</div>
                    <div className="text-sm text-slate-600">Appointments</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{selectedCustomer.appointmentVisits || 0}</div>
                    <div className="text-sm text-slate-600">Apt. Visits</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{selectedCustomer.bookingVisits || 0}</div>
                    <div className="text-sm text-slate-600">Booking Visits</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{selectedCustomer.openAreaVisits || 0}</div>
                    <div className="text-sm text-slate-600">Open Area</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-slate-600">
                    Last visit: <span className="font-semibold">{formatDate(selectedCustomer.lastSeen || selectedCustomer.lastVisit)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Manual Entry Form */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-900">Enter Customer Details</h4>
                <button
                  type="button"
                  onClick={() => setShowManualEntry(false)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.customerEmail || ''}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="customer@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.customerPhone || ''}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Membership Status</label>
                  <select
                    value={formData.membershipStatus || ''}
                    onChange={(e) => setFormData({ ...formData, membershipStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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