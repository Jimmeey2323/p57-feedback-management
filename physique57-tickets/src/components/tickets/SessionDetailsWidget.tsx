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
  const sessionsPerPage = 12;

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
      const sessionsData = await momenceAPI.getAllSessionsWithDetails(3); // Load 3 pages max
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

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.teacher?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
  }, [sessions, searchQuery, filterType, sortBy]);

  const paginatedSessions = useMemo(() => {
    const startIndex = (currentPage - 1) * sessionsPerPage;
    return filteredAndSortedSessions.slice(startIndex, startIndex + sessionsPerPage);
  }, [filteredAndSortedSessions, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedSessions.length / sessionsPerPage);

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
      fitness: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      yoga: 'bg-purple-100 text-purple-700 border-purple-200',
      pilates: 'bg-pink-100 text-pink-700 border-pink-200',
      barre: 'bg-orange-100 text-orange-700 border-orange-200',
      dance: 'bg-blue-100 text-blue-700 border-blue-200',
      strength: 'bg-red-100 text-red-700 border-red-200',
      cardio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[type?.toLowerCase()] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getStatusColor = (session: any) => {
    if (session.isCancelled) return 'bg-red-100 text-red-700 border-red-200';
    if (session.isDraft) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (session.bookingCount >= session.capacity) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getStatusText = (session: any) => {
    if (session.isCancelled) return 'Cancelled';
    if (session.isDraft) return 'Draft';
    if (session.bookingCount >= session.capacity) return 'Full';
    return 'Active';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-br from-emerald-900/90 via-teal-900/90 to-cyan-900/90 backdrop-blur-sm p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Session Details</h3>
            <p className="text-emerald-200 text-sm">Browse and select from available sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {sessions.length > 0 && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
              {filteredAndSortedSessions.length} session{filteredAndSortedSessions.length !== 1 ? 's' : ''}
            </span>
          )}
          <button type="button" className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-300 border border-white/10 backdrop-blur-sm">
            <svg className={`w-5 h-5 transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-6">
          {!apiAvailable && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-amber-800 text-sm font-medium">Session data unavailable - missing API configuration</span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mb-6 space-y-4">
            {/* Search and Load */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search sessions by name, teacher, or type..."
                  className="w-full px-4 py-3 border border-slate-300/30 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 bg-white/70 backdrop-blur-sm transition-all shadow-sm hover:shadow-md"
                  disabled={!apiAvailable}
                />
              </div>
              <button
                onClick={loadSessions}
                disabled={isLoading || !apiAvailable}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                Refresh
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-slate-300/30 rounded-lg bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/40 text-sm"
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
                className="px-4 py-2 border border-slate-300/30 rounded-lg bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/40 text-sm"
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

          {/* Sessions Grid */}
          {!isLoading && paginatedSessions.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {paginatedSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => handleSessionSelect(session)}
                    className={`bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] p-6 ${
                      selectedSession?.id === session.id 
                        ? 'border-emerald-400 ring-2 ring-emerald-400/20 shadow-lg' 
                        : 'border-slate-200/50 hover:border-emerald-300'
                    }`}
                  >
                    {/* Session Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1">{session.name}</h4>
                        <p className="text-sm text-slate-600 mb-2">{formatDate(session.startsAt)}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSessionTypeColor(session.type)}`}>
                            {session.type || 'General'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(session)}`}>
                            {getStatusText(session)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-emerald-600">
                          {session.bookingCount || 0}
                        </div>
                        <div className="text-xs text-slate-500">
                          of {session.capacity || 0}
                        </div>
                      </div>
                    </div>

                    {/* Teacher Info */}
                    <div className="flex items-center gap-3 mb-4">
                      {session.teacher?.pictureUrl ? (
                        <img
                          src={session.teacher.pictureUrl}
                          alt={session.teacher.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-900">
                          {session.teacher?.fullName || 'TBA'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatDuration(session.durationInMinutes)}
                        </div>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-slate-600">
                          {session.isInPerson 
                            ? session.inPersonLocation?.name || 'In Person' 
                            : 'Online Session'}
                        </span>
                      </div>
                      
                      {session.availableSpots !== undefined && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-600">
                            {session.availableSpots} spots available
                          </span>
                        </div>
                      )}

                      {session.utilizationRate !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Utilization</span>
                            <span>{session.utilizationRate}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(session.utilizationRate, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-white/80 border border-slate-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white/80 border border-slate-300 hover:bg-white'
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
                    className="px-3 py-2 bg-white/80 border border-slate-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a7 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No sessions loaded</h3>
              <p className="text-slate-500 mb-4">Click refresh to load sessions from the database</p>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && paginatedSessions.length === 0 && sessions.length > 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No sessions found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Selected Session Info */}
          {selectedSession && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="font-semibold text-emerald-900 mb-2">Selected Session</h4>
              <p className="text-emerald-700">
                <span className="font-medium">{selectedSession.name}</span> with{' '}
                <span className="font-medium">{selectedSession.teacher?.fullName}</span> on{' '}
                <span className="font-medium">{formatDate(selectedSession.startsAt)}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};