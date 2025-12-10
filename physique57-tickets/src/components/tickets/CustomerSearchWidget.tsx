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
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
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
        setShowResults(true);
      } catch (error) {
        console.error('Customer search failed:', error);
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
  }, [searchQuery]);

  // Close dropdown when clicking outside
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
    setSelectedCustomer(customer);
    setShowResults(false);
    setSearchQuery('');
    setIsCollapsed(false);

    // Fetch full customer details including bookings
    try {
      const fullCustomer = await momenceAPI.getCustomerById(customer.id);
      const formattedCustomer = momenceAPI.formatCustomerData(fullCustomer);
      
      // Auto-populate form fields
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
      console.error('Failed to fetch customer details:', error);
    }
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    setSelectedCustomer(null);
    setIsCollapsed(false);
    setSearchResults([]);
    setShowResults(false);
  };

  const handleClearCustomer = () => {
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
      totalBookings: 0,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">👤</span>
          <div>
            <h3 className="text-xl font-bold text-white">Customer Information</h3>
            <p className="text-teal-100 text-sm">Optional - Link ticket to a customer</p>
          </div>
        </div>
        <button
          type="button"
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-6 space-y-6">
          {!selectedCustomer && !showManualEntry ? (
            <>
              {/* Search Input */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔍 Search Customer
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500"></div>
                    </div>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {searchResults.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleCustomerSelect(customer)}
                        className="w-full px-4 py-3 text-left hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-600">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            customer.membershipStatus === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.membershipStatus || 'Unknown Status'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {showResults && searchResults.length === 0 && !isSearching && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                    No customers found
                  </div>
                )}
              </div>

              {/* Manual Entry Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleManualEntry}
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 mx-auto hover:underline"
                >
                  <span>➕</span>
                  Customer not found? Add manually
                </button>
              </div>
            </>
          ) : selectedCustomer ? (
            <>
              {/* Selected Customer Card */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {selectedCustomer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{selectedCustomer.name}</h4>
                      <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearCustomer}
                    className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Phone</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCustomer.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Membership</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      selectedCustomer.membershipStatus === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedCustomer.membershipStatus || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Total Bookings</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCustomer.totalBookings || 0}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Momence ID</span>
                    <span className="text-xs font-mono text-gray-600">{selectedCustomer.id}</span>
                  </div>
                </div>
              </div>
            </>
          ) : showManualEntry ? (
            <>
              {/* Manual Entry Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Enter Customer Details Manually</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManualEntry(false);
                      setIsCollapsed(true);
                    }}
                    className="text-gray-600 hover:text-gray-700 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail || ''}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone || ''}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+91 1234567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
