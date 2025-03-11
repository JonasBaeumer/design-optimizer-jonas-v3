import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Component } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fadeIn, staggerContainer } from '@/utils/transitions';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Define a type for subcomponents
interface Subcomponent {
  name: string;
  partNumber?: string;
  category?: string;
  quantity?: number;
  inStock?: boolean;
  specifications: Record<string, string>;
}

// Enhanced component type with subcomponents
interface EnhancedComponent extends Component {
  subcomponents?: Subcomponent[];
}

// Sample data with subcomponents
const SAMPLE_COMPONENTS: EnhancedComponent[] = [
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
    inStock: false,
    subcomponents: [
      {
        name: 'Ball Screw Assembly',
        partNumber: 'BSA-3010',
        category: 'Mechanical',
        quantity: 1,
        inStock: true,
        specifications: {
          'Stroke Accuracy': '±0.005 mm',
          'Lead': '10 mm/rev',
          'Dynamic Load Capacity': '3000 N',
          'Material': 'Chrome-plated stainless steel'
        }
      },
      {
        name: 'Linear Guide Rails',
        partNumber: 'LGR-300',
        category: 'Mechanical',
        quantity: 2,
        inStock: true,
        specifications: {
          'Travel Length': '300 mm',
          'Positional Repeatability': '±0.01 mm',
          'Static Load Capacity': '1500 N',
          'Friction Coefficient': '0.15 (approx.)'
        }
      },
      {
        name: 'Position Sensor',
        partNumber: 'PS-1001R',
        category: 'Electronics',
        quantity: 1,
        inStock: false,
        specifications: {
          'Resolution': '0.001 mm',
          'Accuracy': '±0.002 mm',
          'Response Time': '5 ms',
          'Output': '0-10V analog signal'
        }
      },
      {
        name: 'Integrated Drive Motor',
        partNumber: 'IDM-500W',
        category: 'Electromechanical',
        quantity: 1,
        inStock: true,
        specifications: {
          'Power Rating': '500W',
          'Operating Voltage': '230V AC',
          'Maximum Speed': '3000 RPM',
          'Efficiency': '90–95%'
        }
      },
      {
        name: 'Housing and Seals',
        partNumber: 'HS-IP65',
        category: 'Protection',
        quantity: 1,
        inStock: true,
        specifications: {
          'IP Rating': 'IP65',
          'Operating Temperature': '–10°C to 60°C',
          'Seal Type': 'Viton O-ring for durability'
        }
      }
    ]
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
  const [components, setComponents] = useState<EnhancedComponent[]>(SAMPLE_COMPONENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});
  const [newComponent, setNewComponent] = useState<Partial<EnhancedComponent>>({
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
    
    const component: EnhancedComponent = {
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

  const toggleExpandComponent = (id: string) => {
    setExpandedComponents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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

      <div className="max-h-[600px] overflow-y-auto">
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
                <React.Fragment key={component.id}>
                  <motion.tr 
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleExpandComponent(component.id)}
                          className="flex items-center"
                        >
                          {expandedComponents[component.id] ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Show Details
                            </>
                          )}
                        </Button>
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
                  
                  {/* Subcomponents panel */}
                  {expandedComponents[component.id] && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={6} className="p-0 border-t border-border">
                        <div className="bg-muted/10 p-4">
                          <h4 className="font-medium text-sm mb-3">Subcomponents</h4>
                          {component.subcomponents && component.subcomponents.length > 0 ? (
                            <div className="space-y-4">
                              {component.subcomponents.map((subcomponent, index) => (
                                <Collapsible key={index} className="border rounded-md">
                                  <CollapsibleTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      className="w-full flex items-center justify-between p-3 text-left"
                                    >
                                      <span className="font-medium">{subcomponent.name}</span>
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="px-4 pb-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                      <div>
                                        <div className="mb-2">
                                          <span className="text-xs text-muted-foreground">Part Number</span>
                                          <div className="font-mono text-sm">{subcomponent.partNumber || 'N/A'}</div>
                                        </div>
                                        <div className="mb-2">
                                          <span className="text-xs text-muted-foreground">Category</span>
                                          <div>
                                            <Badge variant="outline" className="font-normal text-xs">
                                              {subcomponent.category || 'N/A'}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="mb-2">
                                          <span className="text-xs text-muted-foreground">Quantity</span>
                                          <div className="text-sm">{subcomponent.quantity || 'N/A'}</div>
                                        </div>
                                        <div>
                                          <span className="text-xs text-muted-foreground">Status</span>
                                          <div>
                                            {subcomponent.inStock !== undefined && (
                                              <Badge 
                                                className={subcomponent.inStock ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                                              >
                                                {subcomponent.inStock ? 'In Stock' : 'Not in Stock'}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="border-t pt-3">
                                      <h5 className="text-sm font-medium mb-2">Specifications</h5>
                                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {Object.entries(subcomponent.specifications).map(([key, value]) => (
                                          <div key={key} className="text-sm">
                                            <dt className="font-medium text-xs text-muted-foreground">{key}</dt>
                                            <dd>{value}</dd>
                                          </div>
                                        ))}
                                      </dl>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No subcomponents available</p>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
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
