
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import DataAnalyzerContent from '@/components/masterData/DataAnalyzerContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MasterDataAnalyzer = () => {
  return (
    <MainLayout>
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="relative">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-0 top-0 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Chat
            </Button>
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-8 pt-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Master Data Analyzer</h1>
              <p className="text-muted-foreground text-lg">
                Analyze and consolidate similar parts to optimize your inventory
              </p>
            </motion.div>
          </div>
        </div>

        <DataAnalyzerContent />
      </motion.div>
    </MainLayout>
  );
};

export default MasterDataAnalyzer;
