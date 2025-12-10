import React from 'react';
import { TicketList } from '../components/tickets/TicketList';
import { MainLayout } from '../components/layout/MainLayout';

export const TicketsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <TicketList />
      </div>
    </MainLayout>
  );
};
