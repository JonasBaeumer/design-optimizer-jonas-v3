
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Component } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fadeIn, staggerContainer } from '@/utils/transitions';

const SAMPLE_COMPONENTS: Component[] = [
  {
    id: '1',
    name: 'Linear Actuator',
    partNumber: 'LA-2045-B',
    description: 'High-precision linear actuator with 200mm stroke',
    category: 'Motion Control',
    specifications: {
      stroke: '200mm',
      force: '5000N',
      speed: '100mm/s'
    },
    quantity: 2,
    inStock: false
  },
  {
    id: '2',
    name: 'Servo Motor',
    partNumber: 'SM-750-A',
    description: '750W servo motor with encoder',
    category: 'Motion Control',
    specifications: {
      power: '750W',
      voltage: '48V',
      rpm: '3000'
    },
    quantity: 4,
    inStock: true
  },
  {
    id: '3',
    name: 'PLC Controller',
    partNumber: 'PLC-5000',
    description: 'Programmable logic controller with 32 I/O',
    category: 'Control',
    specifications: {
      inputs: 16,
      outputs: 16,
      voltage: '24V'
    },
    quantity: 1,
    inStock: false
  }
];

const ComponentsList = () => {
  const [components, setComponents] = useState<Component[]>(SAMPLE_COMPONENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    name: '',
    partNumber: '',
    description: '',
    category: '',
    quantity: 1,
    inStock: false,
    specifications: {}
  });

  const handleAddComponent = () => {
    if (!newComponent.name || !newComponent.partNumber) return;
    
    const component: Component = {
      id: Date.now().toString(),
      name: newComponent.name || '',
      partNumber: newComponent.partNumber || '',
      description: newComponent.description || '',
      category: newComponent.category || '',
      specifications: newComponent.specifications || {},
      quantity: newComponent.quantity || 1,
      inStock: newComponent.inStock || false,
    };
    
    setComponents([...components, component]);
    setNewComponent({
      name: '',
      partNumber: '',
      description: '',
      category: '',
      quantity: 1,
      inStock: false,
      specifications: {}
    });
    setShowAddForm(false);
  };
  
  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const filteredComponents = components.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-medium">Required Components</h3>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter components</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={() => setShowAddForm(true)} size="sm" className="shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Add Component
            </Button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <motion.div
          className="p-4 border-b bg-muted/20"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="component-name" className="input-label">Component Name</label>
              <Input
                id="component-name"
                value={newComponent.name || ''}
                onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
                placeholder="E.g., Linear Actuator"
              />
            </div>
            <div>
              <label htmlFor="part-number" className="input-label">Part Number</label>
              <Input
                id="part-number"
                value={newComponent.partNumber || ''}
                onChange={(e) => setNewComponent({...newComponent, partNumber: e.target.value})}
                placeholder="E.g., LA-2045-B"
              />
            </div>
            <div>
              <label htmlFor="category" className="input-label">Category</label>
              <Input
                id="category"
                value={newComponent.category || ''}
                onChange={(e) => setNewComponent({...newComponent, category: e.target.value})}
                placeholder="E.g., Motion Control"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="input-label">Quantity</label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newComponent.quantity || 1}
                onChange={(e) => setNewComponent({...newComponent, quantity: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="description" className="input-label">Description</label>
            <Input
              id="description"
              value={newComponent.description || ''}
              onChange={(e) => setNewComponent({...newComponent, description: e.target.value})}
              placeholder="Brief description of the component"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddComponent}>
              <Check className="h-4 w-4 mr-1" />
              Add Component
            </Button>
          </div>
        </motion.div>
      )}

      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="text-xs font-medium text-left p-3 w-[30%]">
                <div className="flex items-center">
                  Component
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th className="text-xs font-medium text-left p-3 w-[15%]">Part Number</th>
              <th className="text-xs font-medium text-left p-3 w-[10%]">Category</th>
              <th className="text-xs font-medium text-left p-3 w-[10%]">Quantity</th>
              <th className="text-xs font-medium text-left p-3 w-[10%]">Status</th>
              <th className="text-xs font-medium text-left p-3 w-[25%]">Actions</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((component) => (
                <motion.tr 
                  key={component.id} 
                  className="border-t border-border" 
                  variants={fadeIn}
                >
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-xs text-muted-foreground">{component.description}</div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-xs">{component.partNumber}</td>
                  <td className="p-3">
                    <Badge variant="outline" className="font-normal text-xs">
                      {component.category}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">{component.quantity}</td>
                  <td className="p-3">
                    <Badge 
                      className={component.inStock ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                    >
                      {component.inStock ? 'In Stock' : 'Not in Stock'}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveComponent(component.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  <div className="text-muted-foreground">
                    <p>No components found</p>
                    <p className="text-sm">Try a different search term or add a new component</p>
                  </div>
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComponentsList;
