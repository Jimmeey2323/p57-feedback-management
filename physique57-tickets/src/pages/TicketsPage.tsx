import React from 'react';
import { TicketList } from '../components/tickets/TicketList';
import { MainLayout } from '../components/layout/MainLayout';
import { motion } from 'framer-motion';

const pageTitleAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const TicketsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={pageTitleAnimation}
            className="text-5xl font-bold mb-4 bg-gradient-primary text-transparent bg-clip-text"
          >
            Tickets
          </motion.h1>
          <p className="lux-body text-[#616161] text-lg">Manage and track all your tickets here.</p>
        </div>
        <TicketList />
      </div>
    </MainLayout>
  );
};
