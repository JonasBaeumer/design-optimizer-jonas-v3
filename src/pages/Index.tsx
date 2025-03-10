
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeIn } from '@/utils/transitions';
import MainLayout from '@/layouts/MainLayout';
import Chat from '@/components/Chat';
import ComponentsList from '@/components/ComponentsList';
import { Package, MessageSquare } from 'lucide-react';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('components');

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

        <Tabs defaultValue="components" className="w-full" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="components" className="flex items-center justify-center">
              <Package className="h-4 w-4 mr-2" />
              Required Components
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat Interface
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="mt-0">
            <div className="w-full">
              <ComponentsList />
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="w-full">
              <Chat />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
