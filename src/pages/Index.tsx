
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeIn } from '@/utils/transitions';
import MainLayout from '@/layouts/MainLayout';
import Chat from '@/components/Chat';
import InputForm from '@/components/InputForm';
import ComponentsList from '@/components/ComponentsList';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('chat');

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InputForm />
            <ComponentsList />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="chat" className="w-full" onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="chat">Chat Interface</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-0">
                <Chat />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <div className="p-12 text-center border rounded-lg bg-card">
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Coming soon in a future update.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
