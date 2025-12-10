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
            /* Selected Customer Profile */
            <div className="space-y-6">
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-slate-600">Loading customer details...</span>
                </div>
              )}
              
              {/* Customer Header */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {selectedCustomer.pictureUrl ? (
                        <img src={selectedCustomer.pictureUrl} alt={selectedCustomer.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {selectedCustomer.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        selectedCustomer.membershipStatus === 'active' ? 'bg-emerald-400' : 'bg-slate-400'
                      }`}></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h4>
                      <p className="text-slate-600">{selectedCustomer.email}</p>
                      <p className="text-slate-500">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMembershipStatusColor(selectedCustomer.membershipStatus || 'inactive')}`}>
                    {(selectedCustomer.membershipStatus || 'inactive').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityLevelColor(selectedCustomer.activityLevel || 'new')}`}>
                    {(selectedCustomer.activityLevel || 'new').toUpperCase()}
                  </span>
                  {selectedCustomer.customerTags?.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: tag.badgeColor + '20', color: tag.badgeColor }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedCustomer.totalVisits || 0}</div>
                    <div className="text-xs text-slate-600">Total Visits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{selectedCustomer.totalBookings || 0}</div>
                    <div className="text-xs text-slate-600">Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedCustomer.totalSessions || 0}</div>
                    <div className="text-xs text-slate-600">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedCustomer.activeMemberships?.length || 0}</div>
                    <div className="text-xs text-slate-600">Active Plans</div>
                  </div>
                </div>
              </div>

              {/* Membership Details */}
              {selectedCustomer.currentMembershipName && (
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h5 className="font-semibold text-slate-900 mb-3">Current Membership</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Plan:</span>
                      <span className="font-medium">{selectedCustomer.currentMembershipName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="capitalize">{selectedCustomer.currentMembershipType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Valid Until:</span>
                      <span>{formatDate(selectedCustomer.membershipEndDate)}</span>
                    </div>
                    {selectedCustomer.sessionsLimit && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sessions Used:</span>
                        <span>{selectedCustomer.sessionsUsed || 0} / {selectedCustomer.sessionsLimit}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              {selectedCustomer.recentSessions?.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h5 className="font-semibold text-slate-900 mb-3">Recent Sessions</h5>
                  <div className="space-y-2">
                    {selectedCustomer.recentSessions.slice(0, 3).map((session: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                        <div>
                          <div className="font-medium text-sm">{session.session?.name || 'Unknown Session'}</div>
                          <div className="text-xs text-slate-500">{formatDate(session.session?.startsAt)}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          session.checkedIn ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {session.checkedIn ? 'Attended' : 'Booked'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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