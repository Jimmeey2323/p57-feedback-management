import React from 'react';
import { CreateTicketForm } from '../components/tickets/CreateTicketForm';
import { MainLayout } from '../components/layout/MainLayout';

export const CreateTicketPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <CreateTicketForm />
      </div>
    </MainLayout>
  );
};
