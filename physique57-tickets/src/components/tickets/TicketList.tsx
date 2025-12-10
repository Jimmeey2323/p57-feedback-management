import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Ticket, Category, Subcategory, User } from '../../types';
import { Button } from '../ui/Button';
import { Select } from '../ui/Input';
import { 
  Search,
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  XCircle,
  ArrowUpCircle,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TicketWithDetails extends Ticket {
  category?: Category;
  subcategory?: Subcategory;
  reported_by?: User;
  assigned_to?: User;
}

export const TicketList: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
    loadTickets();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          category:categories(id, name, color_code),
          subcategory:subcategories(id, name),
          reported_by:users!tickets_reported_by_user_id_fkey(id, full_name, email),
          assigned_to:users!tickets_assigned_to_user_id_fkey(id, full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      assigned: 'bg-purple-100 text-purple-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      pending: 'bg-orange-100 text-orange-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700',
      reopened: 'bg-red-100 text-red-700',
    };

    const labels = {
      new: 'New',
      assigned: 'Assigned',
      in_progress: 'In Progress',
      pending: 'Pending',
      resolved: 'Resolved',
      closed: 'Closed',
      reopened: 'Reopened',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category_id === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600 mt-1">{filteredTickets.length} tickets found</p>
        </div>
        <Button onClick={() => navigate('/tickets/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ticket #, title, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </Select>

          <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Select>

          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Ticket List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first ticket to get started'}
          </p>
          <Button onClick={() => navigate('/tickets/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Ticket
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => navigate(`/tickets/${ticket.id}`)}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(ticket.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-mono text-gray-500">
                        {ticket.ticket_number}
                      </span>
                      {getPriorityBadge(ticket.priority)}
                      {getStatusBadge(ticket.status)}
                      {ticket.escalation_level > 0 && (
                        <span className="flex items-center text-xs text-red-600 font-medium">
                          <ArrowUpCircle className="w-4 h-4 mr-1" />
                          Escalated (L{ticket.escalation_level})
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {ticket.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <span className="font-medium">{ticket.category?.name}</span>
                        {ticket.subcategory && (
                          <>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span>{ticket.subcategory.name}</span>
                          </>
                        )}
                      </span>

                      {ticket.studio_location && (
                        <span>📍 {ticket.studio_location}</span>
                      )}

                      {ticket.customer_name && (
                        <span>👤 {ticket.customer_name}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Created {formatDate(ticket.created_at)}</span>
                      {ticket.reported_by && (
                        <span>by {ticket.reported_by.full_name}</span>
                      )}
                      {ticket.assigned_to && (
                        <span>• Assigned to {ticket.assigned_to.full_name}</span>
                      )}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
