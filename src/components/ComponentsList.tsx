import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info, RefreshCw, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Component, Subcomponent, ReplacementItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fadeIn, staggerContainer } from '@/utils/transitions';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ReplacementOverlay from './ReplacementOverlay';
import { useToast } from '@/hooks/use-toast';

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
    inStock: true,
    subcomponents: [
      {
        name: 'Encoder Unit',
        partNumber: 'EU-1024P',
        category: 'Electronics',
        quantity: 1,
        inStock: true,
        specifications: {
          'Resolution': '1024 pulses/revolution',
          'Interface': 'Incremental ABZ',
          'Output Type': 'Differential Line Driver'
        }
      },
      {
        name: 'Motor Windings',
        partNumber: 'MW-750S',
        category: 'Electromechanical',
        quantity: 1,
        inStock: true,
        specifications: {
          'Winding Type': 'Star configuration',
          'Insulation Class': 'F (155°C)'
        }
      }
    ]
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
    inStock: false,
    subcomponents: [
      {
        name: 'CPU Module',
        partNumber: 'CPU-ARM9',
        category: 'Electronics',
        quantity: 1,
        inStock: true,
        specifications: {
          'Processor': 'ARM9 400MHz',
          'Memory': '256MB RAM, 128MB Flash'
        }
      },
      {
        name: 'Digital Input Module',
        partNumber: 'DI-16DC',
        category: 'Electronics',
        quantity: 1,
        inStock: true,
        specifications: {
          'Channels': '16 channels',
          'Input Type': '24V DC sink/source'
        }
      },
      {
        name: 'Digital Output Module',
        partNumber: 'DO-16R',
        category: 'Electronics',
        quantity: 1,
        inStock: true,
        specifications: {
          'Channels': '16 channels',
          'Output Type': 'Relay, 250V AC/30V DC, 2A'
        }
      }
    ]
  }
];

interface ComponentsListProps {
  onNavigateToChat?: () => void;
}

const ComponentsList: React.FC<ComponentsListProps> = ({ onNavigateToChat }) => {
  const [components, setComponents] = useState<EnhancedComponent[]>(SAMPLE_COMPONENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});
  const [selectedSubcomponent, setSelectedSubcomponent] = useState<Subcomponent | null>(null);
  const [isReplacementOverlayOpen, setIsReplacementOverlayOpen] = useState(false);
  const { toast } = useToast();
  
  const [newComponent, setNewComponent] = useState<Partial<EnhancedComponent>>({
    name: '',
    partNumber: '',
    description: '',
    category: '',
    quantity: 1,
    inStock: false,
    specifications: {}
  });

  const getComponentStatus = (component: EnhancedComponent) => {
    if (!component.subcomponents || component.subcomponents.length === 0) {
      return { 
        hasIssues: false, 
        missingCount: 0, 
        outOfStockCount: 0,
        totalSubcomponents: 0,
        allAvailable: true
      };
    }

    const missingCount = component.subcomponents.filter(sub => sub.inStock === false).length;
    
    return {
      hasIssues: missingCount > 0,
      missingCount,
      outOfStockCount: missingCount,
      totalSubcomponents: component.subcomponents.length,
      allAvailable: missingCount === 0
    };
  };

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

  const handleShowReplacements = (subcomponent: Subcomponent) => {
    setSelectedSubcomponent(subcomponent);
    setIsReplacementOverlayOpen(true);
  };

  const closeReplacementOverlay = () => {
    setIsReplacementOverlayOpen(false);
  };
  
  const handleReplaceComponent = (replacement: ReplacementItem) => {
    const updatedComponents = components.map(component => {
      if (!component.subcomponents) return component;
      
      const containsSubcomponent = component.subcomponents.some(
        sub => sub === selectedSubcomponent
      );
      
      if (!containsSubcomponent) return component;
      
      const updatedSubcomponents = component.subcomponents.map(sub => {
        if (sub === selectedSubcomponent) {
          return {
            ...sub,
            replacedWith: replacement,
            inStock: true,
            name: `${sub.name.replace(" (Replaced)", "")} (Replaced)`,
            originalPartNumber: sub.originalPartNumber || sub.partNumber,
            partNumber: replacement.partNumber,
            category: replacement.category
          };
        }
        return sub;
      });
      
      return {
        ...component,
        subcomponents: updatedSubcomponents
      };
    });
    
    setComponents(updatedComponents);
  };

  const handleRevertReplacement = (componentId: string, subcomponentIndex: number) => {
    const updatedComponents = components.map(component => {
      if (component.id !== componentId || !component.subcomponents) return component;
      
      const updatedSubcomponents = component.subcomponents.map((sub, index) => {
        if (index === subcomponentIndex && sub.replacedWith) {
          const originalName = sub.name.replace(" (Replaced)", "");
          
          return {
            ...sub,
            replacedWith: undefined,
            inStock: false,
            name: originalName,
            partNumber: sub.originalPartNumber,
            category: sub.category?.split(" → ")[0]
          };
        }
        return sub;
      });
      
      return {
        ...component,
        subcomponents: updatedSubcomponents
      };
    });
    
    setComponents(updatedComponents);
    toast({
      title: "Replacement Reverted",
      description: "Component has been restored to its original state",
      variant: "default",
    });
  };

  const filteredComponents = components.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="overflow-hidden relative">
      {onNavigateToChat && (
        <div className="absolute top-4 right-4 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onNavigateToChat}
                  variant="outline" 
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 flex items-center gap-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Back to Chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to chat conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

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
              <th className="text-xs font-medium text-left p-3 w-[35%]">
                <div className="flex items-center">
                  Component
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th className="text-xs font-medium text-left p-3 w-[15%]">Part Number</th>
              <th className="text-xs font-medium text-left p-3 w-[10%]">Category</th>
              <th className="text-xs font-medium text-left p-3 w-[10%]">Quantity</th>
              <th className="text-xs font-medium text-left p-3 w-[15%]">Status</th>
              <th className="text-xs font-medium text-left p-3 w-[15%]">Actions</th>
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
                        <div className="font-medium">
                          {component.name}
                        </div>
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
                      <div className="flex items-center gap-2">
                        {component.subcomponents && component.subcomponents.length > 0 ? (
                          <>
                            {getComponentStatus(component).allAvailable ? (
                              <Badge 
                                variant="success"
                                className="flex items-center gap-1 whitespace-nowrap"
                              >
                                <CheckCircle className="h-3 w-3" />
                                All parts available
                              </Badge>
                            ) : (
                              <Badge 
                                variant="critical"
                                className="flex items-center gap-1 whitespace-nowrap"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {getComponentStatus(component).missingCount} parts missing
                              </Badge>
                            )}
                          </>
                        ) : (
                          <Badge 
                            variant={component.inStock ? "success" : "warning"}
                            className="flex items-center gap-1 whitespace-nowrap"
                          >
                            {component.inStock ? (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                In Stock
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3" />
                                Not in Stock
                              </>
                            )}
                          </Badge>
                        )}
                      </div>
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
                              {getComponentStatus(component).hasIssues && (
                                <Badge variant="critical" className="ml-2 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {getComponentStatus(component).missingCount}
                                </Badge>
                              )}
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
                              {component.subcomponents.map((subcomponent, index) => {
                                const isReplaced = subcomponent.replacedWith !== undefined;
                                const borderClass = isReplaced 
                                  ? 'border-green-200 bg-green-50/30' 
                                  : (!subcomponent.inStock ? 'border-red-200 bg-red-50/30' : '');
                                
                                return (
                                  <Collapsible key={index} className={`border rounded-md ${borderClass}`}>
                                    <CollapsibleTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        className="w-full flex items-center justify-between p-3 text-left"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">
                                            {subcomponent.name}
                                            {isReplaced && (
                                              <span className="ml-1 text-sm text-green-600">
                                                (Replaced)
                                              </span>
                                            )}
                                          </span>
                                          {subcomponent.inStock !== undefined && (
                                            <Badge 
                                              variant={subcomponent.inStock ? "outline" : "destructive"}
                                              className="flex items-center gap-1"
                                            >
                                              {subcomponent.inStock ? (
                                                <>
                                                  <CheckCircle className="h-3 w-3" />
                                                  Available
                                                </>
                                              ) : (
                                                <>
                                                  <AlertTriangle className="h-3 w-3" />
                                                  Unavailable
                                                </>
                                              )}
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {isReplaced ? (
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              className="h-7 gap-1 text-orange-600 border-orange-200 hover:bg-orange-50"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleRevertReplacement(component.id, index);
                                              }}
                                            >
                                              <RefreshCw className="h-3.5 w-3.5" />
                                              Revert
                                            </Button>
                                          ) : !subcomponent.inStock && (
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              className="h-7 gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleShowReplacements(subcomponent);
                                              }}
                                            >
                                              <Info className="h-3.5 w-3.5" />
                                              Alternatives
                                            </Button>
                                          )}
                                          <ChevronDown className="h-4 w-4" />
                                        </div>
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="px-4 pb-3">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                          <div className="mb-2">
                                            <span className="text-xs text-muted-foreground">Part Number</span>
                                            <div className="font-mono text-sm">
                                              {isReplaced ? (
                                                <>
                                                  {subcomponent.originalPartNumber || ''}
                                                  <span className="mx-1 text-muted-foreground">→</span>
                                                  <span className="text-green-600">
                                                    {subcomponent.partNumber}
                                                  </span>
                                                </>
                                              ) : (
                                                subcomponent.partNumber || 'N/A'
                                              )}
                                            </div>
                                          </div>
                                          <div className="mb-2">
                                            <span className="text-xs text-muted-foreground">Category</span>
                                            <div>
                                              <Badge variant="outline" className="font-normal text-xs">
                                                {subcomponent.category || 'N/A'}
                                                {isReplaced && subcomponent.replacedWith?.category !== subcomponent.category && (
                                                  <span className="ml-1 text-green-600">
                                                    → {subcomponent.replacedWith?.category}
                                                  </span>
                                                )}
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
                                                  variant={subcomponent.inStock ? "success" : "critical"}
                                                  className="flex items-center gap-1"
                                                >
                                                  {subcomponent.inStock ? (
                                                    <>
                                                      <CheckCircle className="h-3 w-3" />
                                                      {isReplaced ? 'Replaced' : 'In Stock'}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <AlertTriangle className="h-3 w-3" />
                                                      Not in Stock
                                                    </>
                                                  )}
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
                                          {isReplaced && (
                                            <div className="col-span-2 mt-2 pt-2 border-t">
                                              <h6 className="text-xs font-medium text-green-700 mb-1">
                                                Replacement Specifications
                                              </h6>
                                              <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {Object.entries(subcomponent.replacedWith?.specifications || {}).map(([key, value]) => (
                                                  <div key={key} className="text-sm">
                                                    <dt className="font-medium text-xs text-muted-foreground">{key}</dt>
                                                    <dd className="text-green-700">{value}</dd>
                                                  </div>
                                                ))}
                                              </dl>
                                            </div>
                                          )}
                                        </dl>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
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

      <ReplacementOverlay 
        isOpen={isReplacementOverlayOpen}
        onClose={closeReplacementOverlay}
        subcomponent={selectedSubcomponent}
        onReplaceComponent={handleReplaceComponent}
      />
    </Card>
  );
};

export default ComponentsList;

