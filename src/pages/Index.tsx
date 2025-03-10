
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import MainLayout from '@/layouts/MainLayout';
import Chat from '@/components/Chat';
import ComponentsList from '@/components/ComponentsList';
import { Package } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center max-w-2xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Design Optimizer</h1>
            <p className="text-muted-foreground text-lg">
              Optimize your machine designs using our overstock inventory
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Required Components</h2>
            </div>
            <div className="bg-card rounded-lg border shadow-sm">
              <ComponentsList />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Chat />
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
