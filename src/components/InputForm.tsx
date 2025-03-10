
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const InputForm = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/json' || droppedFile.name.endsWith('.json')) {
        setFile(droppedFile);
      } else {
        toast({
          title: "Unsupported file type",
          description: "Please upload a JSON file with your design data.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Design data uploaded",
        description: "Your historical design data has been successfully processed.",
      });
    }, 2000);
  };
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Upload Design Data</CardTitle>
        <CardDescription>
          Add your historical design data or component list for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="E.g., Automated Assembly Line 2023" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description"
                placeholder="Briefly describe the machine and its primary function"
                className="min-h-[100px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="block">Design File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <div className="text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium mb-1">Drag and drop your design file</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Upload a JSON file with your historical design data
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".json,application/json"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <motion.div 
                    className="flex items-center justify-between bg-secondary rounded-md p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={removeFile}
                      className="h-8 w-8 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: .json
              </p>
            </div>
          </div>
          
          <motion.div 
            className="mt-6 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button type="submit" disabled={!file || loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Upload Design Data
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
