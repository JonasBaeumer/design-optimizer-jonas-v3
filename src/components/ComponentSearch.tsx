
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronUp, ChevronDown, FileText, FileImage, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { fadeIn } from '@/utils/transitions';

// Sample component data
const sampleComponents = [
  {
    id: '1',
    name: '3mm Stainless Steel Screw',
    modelId: 'A123',
    manufacturer: 'FastenCorp',
    price: 0.12,
    quantity: 1500,
    material: 'Stainless Steel 316',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '70,000 psi',
    corrosionResistance: 'High',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  },
  {
    id: '2',
    name: '5mm Galvanized Hex Bolt',
    modelId: 'B456',
    manufacturer: 'BoltWorks',
    price: 0.18,
    quantity: 2200,
    material: 'Galvanized Steel',
    threadSpec: 'M5 x 0.8',
    tensileStrength: '55,000 psi',
    corrosionResistance: 'Medium',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  },
  {
    id: '3',
    name: '2mm Titanium Screw',
    modelId: 'C789',
    manufacturer: 'TechFasteners',
    price: 0.35,
    quantity: 800,
    material: 'Titanium Alloy Ti-6Al-4V',
    threadSpec: 'M2 x 0.4',
    tensileStrength: '125,000 psi',
    corrosionResistance: 'Very High',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  },
  {
    id: '4',
    name: '8mm Brass Machine Screw',
    modelId: 'D101',
    manufacturer: 'MetalCrafters',
    price: 0.22,
    quantity: 1200,
    material: 'Brass Alloy C360',
    threadSpec: 'M8 x 1.25',
    tensileStrength: '40,000 psi',
    corrosionResistance: 'High',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  },
  {
    id: '5',
    name: '4mm Zinc-Plated Steel Screw',
    modelId: 'E202',
    manufacturer: 'IndustrialSupply',
    price: 0.09,
    quantity: 3000,
    material: 'Zinc-Plated Steel',
    threadSpec: 'M4 x 0.7',
    tensileStrength: '60,000 psi',
    corrosionResistance: 'Low',
    imagePlaceholder: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  }
];

// Manufacturers for filter dropdown
const manufacturers = ['All', 'FastenCorp', 'BoltWorks', 'TechFasteners', 'MetalCrafters', 'IndustrialSupply'];

const ComponentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0.50 });
  const [expandedComponentId, setExpandedComponentId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter components based on search term and filters
  const filteredComponents = sampleComponents.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      component.modelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.material.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesManufacturer = 
      selectedManufacturer === 'All' || 
      component.manufacturer === selectedManufacturer;
    
    const matchesPrice = 
      component.price >= priceRange.min && 
      component.price <= priceRange.max;
    
    return matchesSearch && matchesManufacturer && matchesPrice;
  });

  // Toggle component details expansion
  const toggleExpand = (id: string) => {
    setExpandedComponentId(expandedComponentId === id ? null : id);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Component Search</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search components..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-accent" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="bg-primary">
            Add Component
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Collapsible open={showFilters}>
        <CollapsibleContent className="space-y-4 mt-2 mb-2 bg-muted/30 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Manufacturer</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
              >
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Price Range ($ per unit)</label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                  className="w-full"
                />
                <span>to</span>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 0 })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Results Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium">Component Name & ID</TableHead>
              <TableHead className="font-medium">Manufacturer</TableHead>
              <TableHead className="font-medium">Price per Piece</TableHead>
              <TableHead className="font-medium">Quantity Available</TableHead>
              <TableHead className="text-right font-medium">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComponents.length > 0 ? (
              filteredComponents.map(component => (
                <React.Fragment key={component.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {component.name}
                      <div className="text-xs text-muted-foreground">Model: {component.modelId}</div>
                    </TableCell>
                    <TableCell>{component.manufacturer}</TableCell>
                    <TableCell>${component.price.toFixed(2)}</TableCell>
                    <TableCell>{component.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(component.id)}
                        className="flex items-center gap-1"
                      >
                        {expandedComponentId === component.id ? (
                          <>Hide <ChevronUp className="h-3 w-3" /></>
                        ) : (
                          <>View <ChevronDown className="h-3 w-3" /></>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded details section */}
                  {expandedComponentId === component.id && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0 bg-muted/20">
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardContent className="pt-6">
                                <h3 className="text-sm font-medium flex items-center mb-3">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Technical Information
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-muted-foreground">Material:</div>
                                  <div>{component.material}</div>
                                  
                                  <div className="text-muted-foreground">Thread Spec:</div>
                                  <div>{component.threadSpec}</div>
                                  
                                  <div className="text-muted-foreground">Tensile Strength:</div>
                                  <div>{component.tensileStrength}</div>
                                  
                                  <div className="text-muted-foreground">Corrosion Resistance:</div>
                                  <div>{component.corrosionResistance}</div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="pt-6">
                                <h3 className="text-sm font-medium flex items-center mb-3">
                                  <FileImage className="h-4 w-4 mr-2" />
                                  CAD Drawing (Placeholder)
                                </h3>
                                <div className="aspect-video bg-muted/40 rounded-md flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={component.imagePlaceholder} 
                                    alt="CAD Drawing Placeholder" 
                                    className="w-full h-full object-cover opacity-60"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                  CAD drawing will be available in future updates
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Info className="h-8 w-8 mb-2 opacity-40" />
                    <p>No components found matching your search criteria</p>
                    <p className="text-sm">Try adjusting your search terms or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default ComponentSearch;
