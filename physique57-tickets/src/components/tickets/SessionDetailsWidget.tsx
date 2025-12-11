import React, { useState, useEffect, useMemo } from 'react';
import { momenceAPI } from '../../services/momenceAPI';

interface SessionDetailsWidgetProps {
  onSessionSelect?: (session: any) => void;
  formData?: any;
  setFormData?: (data: any) => void;
}

export const SessionDetailsWidget: React.FC<SessionDetailsWidgetProps> = ({
  onSessionSelect,
  formData,
  setFormData,
}) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('startsAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState('');
  const sessionsPerPage = 12;

  const tomorrowISO = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.toISOString().split('.')[0]}Z`;
  }, []);

  useEffect(() => {
    // Check if API is configured
    const hasRequiredEnvVars = !!(
      process.env.REACT_APP_MOMENCE_AUTH_TOKEN &&
      process.env.REACT_APP_MOMENCE_USERNAME &&
      process.env.REACT_APP_MOMENCE_PASSWORD
    );
    setApiAvailable(hasRequiredEnvVars);

    if (hasRequiredEnvVars && !isCollapsed) {
      loadSessions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  const loadSessions = async () => {
    if (!apiAvailable) return;
    
    setIsLoading(true);
    try {
      console.log('Loading sessions with pagination...');
      const sessionsData = await momenceAPI.getAllSessionsWithDetails(3, tomorrowISO); // Load 3 pages max, exclude future
      const formattedSessions = sessionsData.map(session => momenceAPI.formatSessionData(session));
      setSessions(formattedSessions);
      console.log(`Loaded ${formattedSessions.length} sessions`);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedSessions = useMemo(() => {
    let filtered = sessions;

    // Exclude future classes just in case
    const cutoff = new Date(tomorrowISO);
    filtered = filtered.filter(session => new Date(session.startsAt) < cutoff);

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.teacher?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected class dropdown
    if (selectedClassId) {
      filtered = filtered.filter(session => String(session.id) === selectedClassId);
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(session => {
        if (filterType === 'inPerson') return session.isInPerson;
        if (filterType === 'online') return !session.isInPerson;
        if (filterType === 'recurring') return session.isRecurring;
        if (filterType === 'draft') return session.isDraft;
        if (filterType === 'cancelled') return session.isCancelled;
        if (filterType === 'active') return !session.isDraft && !session.isCancelled;
        return session.type === filterType;
      });
    }

    // Sort sessions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'startsAt':
          return new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'teacher':
          return (a.teacher?.fullName || '').localeCompare(b.teacher?.fullName || '');
        case 'capacity':
          return (b.capacity || 0) - (a.capacity || 0);
        case 'bookings':
          return (b.bookingCount || 0) - (a.bookingCount || 0);
        case 'utilization':
          return (b.utilizationRate || 0) - (a.utilizationRate || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [sessions, searchQuery, filterType, sortBy, selectedClassId, tomorrowISO]);

  const paginatedSessions = useMemo(() => {
    const startIndex = (currentPage - 1) * sessionsPerPage;
    return filteredAndSortedSessions.slice(startIndex, startIndex + sessionsPerPage);
  }, [filteredAndSortedSessions, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedSessions.length / sessionsPerPage);

  const classOptions = useMemo(() => {
    const unique = new Map<string, string>();
    sessions.forEach((s) => {
      if (s?.id) {
        unique.set(String(s.id), s.name || `Session ${s.id}`);
      }
    });
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, [sessions]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleSessionSelect = (session: any) => {
    setSelectedSession(session);
    if (onSessionSelect) {
      onSessionSelect(session);
    }
    if (setFormData) {
      setFormData({
        ...formData,
        relatedSessionId: session.id,
        relatedSessionName: session.name,
        relatedTeacher: session.teacher?.fullName,
        sessionType: session.type,
        sessionDate: session.startsAt,
      });
    }
  };

  const getSessionTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      fitness: 'bg-[#E3F2FD] text-[#0F3A7D] border-[#C5D7F2]',
      yoga: 'bg-[#F0F2F5] text-[#1A4D99] border-[#D9E2EF]',
      pilates: 'bg-[#F8F9FA] text-[#2C5AA0] border-[#E8EAED]',
      barre: 'bg-[#FFF4E5] text-[#D2691E] border-[#FFE0B2]',
      dance: 'bg-[#E3F2FD] text-[#1A4D99] border-[#C5D7F2]',
      strength: 'bg-[#FFE5E5] text-[#D32F2F] border-[#F5C1C1]',
      cardio: 'bg-[#FFF8E1] text-[#FFA500] border-[#FFE0A3]',
    };
    return colors[type?.toLowerCase()] || 'bg-[#F0F2F5] text-[#1C1C1C] border-[#E8EAED]';
  };

  const getStatusColor = (session: any) => {
    if (session.isCancelled) return 'bg-[#FFE5E5] text-[#D32F2F] border-[#F5C1C1]';
    if (session.isDraft) return 'bg-[#FFF8E1] text-[#FFA500] border-[#FFE0A3]';
    if (session.bookingCount >= session.capacity) return 'bg-[#FFF4E5] text-[#D2691E] border-[#FFE0B2]';
    return 'bg-[#E0F2F1] text-[#00897B] border-[#B2DFDB]';
  };

  const getStatusText = (session: any) => {
    if (session.isCancelled) return 'Cancelled';
    if (session.isDraft) return 'Draft';
    if (session.bookingCount >= session.capacity) return 'Full';
    return 'Active';
  };

  return (
    <div className="bg-[#F8F9FA] rounded-2xl border border-[#E8EAED] shadow-[0_8px_20px_rgba(15,58,125,0.08)] overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-[#0F3A7D] via-[#1A4D99] to-[#0F3A7D] p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/30 shadow-[0_0_12px_rgba(15,58,125,0.25)]">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Session Details</h3>
            <p className="text-white/70 text-sm">Browse and select from available sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {sessions.length > 0 && (
            <span className="px-3 py-1 bg-white/15 rounded-full text-white text-sm font-medium border border-white/30">
              {filteredAndSortedSessions.length} session{filteredAndSortedSessions.length !== 1 ? 's' : ''}
            </span>
          )}
          <button type="button" className="text-white/80 hover:text-white hover:bg-white/15 rounded-xl p-2 transition-all duration-300 border border-white/20 shadow-[0_0_12px_rgba(15,58,125,0.25)]">
            <svg className={`w-5 h-5 transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-6 space-y-6 bg-[#F8F9FA]">
          {!apiAvailable && (
            <div className="p-4 bg-[#FFF8E1] border border-[#FFC107] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-[#8A6D3B] text-sm font-medium">Session data unavailable - missing API configuration</span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-4">
            {/* Search, dropdown, and refresh */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 flex flex-col gap-3 lg:flex-row">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-[#1C1C1C] uppercase tracking-wide mb-1 block">Search Classes</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search by name, teacher, or type..."
                      className="w-full px-4 py-3 pr-10 bg-white border border-[#E8EAED] rounded-lg text-[#1C1C1C] focus:ring-2 focus:ring-[#1A4D99] focus:border-[#1A4D99] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                      disabled={!apiAvailable}
                    />
                    <svg className="w-5 h-5 text-[#1A4D99] absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="w-full lg:w-72">
                  <label className="text-xs font-semibold text-[#1C1C1C] uppercase tracking-wide mb-1 block">Quick Select</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => {
                      setSelectedClassId(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-3 bg-white border border-[#E8EAED] rounded-lg text-[#1C1C1C] focus:ring-2 focus:ring-[#1A4D99] focus:border-[#1A4D99] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    disabled={!apiAvailable}
                  >
                    <option value="">All classes</option>
                    {classOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end">
                <button
                  onClick={loadSessions}
                  disabled={isLoading || !apiAvailable}
                  className="px-6 py-3 bg-[#0F3A7D] hover:bg-[#1A4D99] text-white rounded-lg font-semibold tracking-tight shadow-[0_4px_12px_rgba(15,58,125,0.25)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg text-sm text-[#1C1C1C] focus:ring-2 focus:ring-[#1A4D99] focus:border-[#1A4D99]"
              >
                <option value="all">All Types</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="cancelled">Cancelled</option>
                <option value="inPerson">In Person</option>
                <option value="online">Online</option>
                <option value="recurring">Recurring</option>
                <option value="fitness">Fitness</option>
                <option value="yoga">Yoga</option>
                <option value="pilates">Pilates</option>
                <option value="barre">Barre</option>
                <option value="dance">Dance</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg text-sm text-[#1C1C1C] focus:ring-2 focus:ring-[#1A4D99] focus:border-[#1A4D99]"
              >
                <option value="startsAt">Start Time</option>
                <option value="name">Name</option>
                <option value="teacher">Teacher</option>
                <option value="capacity">Capacity</option>
                <option value="bookings">Bookings</option>
                <option value="utilization">Utilization</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="text-slate-600 text-lg">Loading sessions...</span>
              </div>
            </div>
          )}

          {/* Sessions Table */}
          {!isLoading && paginatedSessions.length > 0 && (
            <>
              <div className="overflow-x-auto rounded-xl border border-[#E8EAED] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <table className="min-w-full divide-y divide-[#ECEFF1]">
                  <thead className="bg-[#E3F2FD]">
                    <tr className="text-left text-[12px] font-semibold text-[#1C1C1C] uppercase tracking-wide h-12">
                      <th className="px-6">Class Name</th>
                      <th className="px-6">Teacher</th>
                      <th className="px-6">Date & Time</th>
                      <th className="px-6">Type</th>
                      <th className="px-6">Status</th>
                      <th className="px-6">Capacity</th>
                      <th className="px-6">Location</th>
                      <th className="px-6">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F2F5]">
                    {paginatedSessions.map((session, idx) => {
                      const isSelected = selectedSession?.id === session.id;
                      const isAlt = idx % 2 === 1;
                      return (
                        <tr
                          key={session.id}
                          onClick={() => handleSessionSelect(session)}
                          className={`cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? 'bg-[#E3F2FD] border-l-4 border-[#0F3A7D] shadow-[0_4px_12px_rgba(15,58,125,0.15)]'
                              : isAlt
                                ? 'bg-[#F8F9FA]'
                                : 'bg-white'
                          } hover:bg-[#E3F2FD]/70`}
                        >
                          <td className="px-6 py-4 text-[14px] font-semibold text-[#0F3A7D]">{session.name}</td>
                          <td className="px-6 py-4 text-[13px] text-[#1C1C1C]">{session.teacher?.fullName || 'TBA'}</td>
                          <td className="px-6 py-4 text-[13px] text-[#1C1C1C]">{formatDate(session.startsAt)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getSessionTypeColor(session.type)}`}>
                              {session.type || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getStatusColor(session)}`}>
                              {getStatusText(session)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[13px] text-[#1C1C1C]">
                            <span className="font-semibold text-[#0F3A7D]">{session.bookingCount || 0}</span>
                            <span className="text-[#616161]"> / {session.capacity || 0}</span>
                            {session.utilizationRate !== undefined && (
                              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#616161]">
                                <div className="w-full bg-[#E8EAED] rounded-full h-1.5">
                                  <div
                                    className="bg-[#1A4D99] h-1.5 rounded-full"
                                    style={{ width: `${Math.min(session.utilizationRate, 100)}%` }}
                                  ></div>
                                </div>
                                <span>{session.utilizationRate}%</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-[13px] text-[#1C1C1C]">
                            {session.isInPerson ? (session.inPersonLocation?.name || 'In Person') : 'Online'}
                          </td>
                          <td className="px-6 py-4 text-[13px] text-[#1C1C1C]">{formatDuration(session.durationInMinutes)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#E3F2FD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#0F3A7D] text-white shadow-[0_4px_12px_rgba(15,58,125,0.25)]'
                              : 'bg-white border border-[#E8EAED] hover:bg-[#E3F2FD]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#E3F2FD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Sessions State */}
          {!isLoading && paginatedSessions.length === 0 && sessions.length === 0 && apiAvailable && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E8EAED] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <svg className="w-16 h-16 text-[#C5D7F2] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a7 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">No sessions loaded</h3>
              <p className="text-[#616161] mb-4">Click refresh to load sessions from the database</p>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && paginatedSessions.length === 0 && sessions.length > 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E8EAED] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <svg className="w-16 h-16 text-[#C5D7F2] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">No sessions found</h3>
              <p className="text-[#616161]">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Selected Session Info */}
          {selectedSession && (
            <div className="mt-4 p-4 bg-[#E3F2FD] border border-[#C5D7F2] rounded-lg shadow-[0_2px_8px_rgba(15,58,125,0.12)]">
              <h4 className="font-semibold text-[#0F3A7D] mb-1">Selected Session</h4>
              <p className="text-[#1C1C1C] text-sm">
                <span className="font-semibold">{selectedSession.name}</span> with{' '}
                <span className="font-semibold">{selectedSession.teacher?.fullName}</span> on{' '}
                <span className="font-semibold">{formatDate(selectedSession.startsAt)}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};