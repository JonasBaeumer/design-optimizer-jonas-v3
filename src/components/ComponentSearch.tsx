import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronUp, ChevronDown, FileText, FileImage, Info, FileCode, FileSliders, FileCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { fadeIn } from '@/utils/transitions';
import bolt1 from '@/ressources/bolt_1.png';
import bolt2 from '@/ressources/bolt_2.png';
import bolt3 from '@/ressources/bolt_3.png';
import bolt4 from '@/ressources/bolt_4.png';

const sampleComponents = [
  {
    id: '1',
    name: 'Metric Machine Screw, Phillips Flat Head, SS 316, 3mm x 0.5mm x 20mm',
    modelId: 'SS-3M-A100',
    manufacturer: 'FastenCorp',
    price: 0.12,
    quantity: 1500,
    material: 'Stainless Steel 316',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '70,000 psi',
    corrosionResistance: 'High',
    imagePlaceholder: bolt1,
    technicalSpecs: {
      headType: 'Phillips Flat Head',
      driveSize: 'PH2',
      length: '20mm',
      headDiameter: '5.5mm',
      weight: '1.2g'
    },
    certifications: [
      'ISO 9001:2015',
      'RoHS Compliant',
      'REACH Compliant'
    ],
    installation: {
      recommendedTorque: '2.5 Nm',
      predrillSize: '2.5mm',
      notes: 'Use with compatible washers for optimal performance'
    }
  },
  {
    id: '2',
    name: 'Metric Machine Screw, Torx Flat Head, SS 304, 3mm x 0.5mm x 25mm',
    modelId: 'PSS-3M-B200',
    manufacturer: 'BoltWorks',
    price: 0.15,
    quantity: 2200,
    material: 'Stainless Steel 304',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '65,000 psi',
    corrosionResistance: 'High',
    imagePlaceholder: bolt2,
    technicalSpecs: {
      headType: 'Torx Flat Head',
      driveSize: 'T15',
      length: '25mm',
      headDiameter: '5.8mm',
      weight: '1.3g'
    },
    certifications: [
      'ISO 9001:2015',
      'DIN EN ISO 4759-1'
    ],
    installation: {
      recommendedTorque: '2.3 Nm',
      predrillSize: '2.5mm',
      notes: 'Ideal for precision applications'
    }
  },
  {
    id: '3',
    name: 'Metric Machine Screw, Hex Socket Flat Head, SS 316L, 3mm x 0.5mm x 22mm',
    modelId: 'MSS-3M-C150',
    manufacturer: 'TechFasteners',
    price: 0.18,
    quantity: 800,
    material: 'Stainless Steel 316L',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '75,000 psi',
    corrosionResistance: 'Very High',
    imagePlaceholder: bolt3,
    technicalSpecs: {
      headType: 'Hex Socket Flat Head',
      driveSize: '2.5mm',
      length: '22mm',
      headDiameter: '5.5mm',
      weight: '1.25g'
    },
    certifications: [
      'ISO 9001:2015',
      'ASTM F593',
      'Marine Grade Certified'
    ],
    installation: {
      recommendedTorque: '2.4 Nm',
      predrillSize: '2.5mm',
      notes: 'Specifically designed for marine environments'
    }
  },
  {
    id: '4',
    name: 'Metric Machine Screw, Hex Flat Head, SS 17-4PH, 3mm x 0.5mm x 18mm',
    modelId: 'ASS-3M-D100',
    manufacturer: 'MetalCrafters',
    price: 0.22,
    quantity: 1200,
    material: 'Stainless Steel 17-4PH',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '85,000 psi',
    corrosionResistance: 'High',
    imagePlaceholder: bolt4,
    technicalSpecs: {
      headType: 'Hex Flat Head',
      driveSize: '5.5mm',
      length: '18mm',
      headDiameter: '5.6mm',
      weight: '1.15g'
    },
    certifications: [
      'AS9100D',
      'ISO 9001:2015',
      'NADCAP'
    ],
    installation: {
      recommendedTorque: '2.6 Nm',
      predrillSize: '2.5mm',
      notes: 'Meets aerospace industry standards'
    }
  },
  {
    id: '5',
    name: 'Metric Machine Screw, Phillips Flat Head, SS 18-8 (A-2), 3mm x 0.5mm x 15mm',
    modelId: 'RSS-3M-E50',
    manufacturer: 'ReliableFasteners',
    price: 0.10,
    quantity: 2000,
    material: 'Stainless Steel 18-8 (A-2)',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '65,000 psi',
    corrosionResistance: 'Good',
    imagePlaceholder: bolt1,
    technicalSpecs: {
      headType: 'Phillips Flat Head',
      driveSize: 'PH1',
      length: '15mm',
      headDiameter: '5.3mm',
      weight: '0.9g'
    },
    certifications: [
      'ISO 9001:2015',
      'ANSI B18.6.3'
    ],
    installation: {
      recommendedTorque: '2.2 Nm',
      predrillSize: '2.5mm',
      notes: 'Suitable for general-purpose applications'
    }
  },
  {
    id: '6',
    name: 'Metric Machine Screw, Socket Head Cap, SS 303, 3mm x 0.5mm x 16mm',
    modelId: 'SCS-3M-F75',
    manufacturer: 'PrecisionFasteners',
    price: 0.20,
    quantity: 1000,
    material: 'Stainless Steel 303',
    threadSpec: 'M3 x 0.5',
    tensileStrength: '70,000 psi',
    corrosionResistance: 'Moderate',
    imagePlaceholder: bolt2,
    technicalSpecs: {
      headType: 'Socket Head Cap',
      driveSize: 'M3',
      length: '16mm',
      headDiameter: '5.4mm',
      weight: '1.1g'
    },
    certifications: [
      'ISO 9001:2015',
      'DIN 912'
    ],
    installation: {
      recommendedTorque: '2.7 Nm',
      predrillSize: '2.5mm',
      notes: 'Ideal for precision mechanical assemblies'
    }
  }
];

const manufacturers = ['All', 'FastenCorp', 'BoltWorks', 'TechFasteners', 'MetalCrafters', 'ReliableFasteners', 'PrecisionFasteners'];

const ComponentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0.50 });
  const [expandedComponentId, setExpandedComponentId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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
        </div>
      </div>

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium">Component Name & ID</TableHead>
              <TableHead className="font-medium">Manufacturer</TableHead>
              <TableHead className="font-medium">Price per Piece</TableHead>
              <TableHead className="font-medium">Quantity on Stock</TableHead>
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
                  
                  {expandedComponentId === component.id && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0 bg-muted/20">
                        <div className="p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
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
                                  {component.technicalSpecs && (
                                    <>
                                      <div className="text-muted-foreground">Head Type:</div>
                                      <div>{component.technicalSpecs.headType}</div>
                                      <div className="text-muted-foreground">Drive Size:</div>
                                      <div>{component.technicalSpecs.driveSize}</div>
                                      <div className="text-muted-foreground">Length:</div>
                                      <div>{component.technicalSpecs.length}</div>
                                      <div className="text-muted-foreground">Head Diameter:</div>
                                      <div>{component.technicalSpecs.headDiameter}</div>
                                      <div className="text-muted-foreground">Weight:</div>
                                      <div>{component.technicalSpecs.weight}</div>
                                    </>
                                  )}
                                  <div className="text-muted-foreground">Tensile Strength:</div>
                                  <div>{component.tensileStrength}</div>
                                  <div className="text-muted-foreground">Corrosion Resistance:</div>
                                  <div>{component.corrosionResistance}</div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="lg:col-span-1">
                              <CardContent className="pt-6">
                                <h3 className="text-sm font-medium flex items-center mb-3">
                                  <FileSliders className="h-4 w-4 mr-2" />
                                  Installation & Certifications
                                </h3>
                                <div className="space-y-4">
                                  {component.installation && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Installation Guidelines</h4>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-muted-foreground">Recommended Torque:</div>
                                        <div>{component.installation.recommendedTorque}</div>
                                        <div className="text-muted-foreground">Predrill Size:</div>
                                        <div>{component.installation.predrillSize}</div>
                                      </div>
                                      <p className="text-sm mt-2 text-muted-foreground">
                                        {component.installation.notes}
                                      </p>
                                    </div>
                                  )}
                                  {component.certifications && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Certifications</h4>
                                      <ul className="text-sm list-disc list-inside space-y-1">
                                        {component.certifications.map((cert, index) => (
                                          <li key={index}>{cert}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="lg:col-span-1">
                              <CardContent className="pt-6">
                                <h3 className="text-sm font-medium flex items-center mb-3">
                                  <FileCheck className="h-4 w-4 mr-2" />
                                  Technical Drawing
                                </h3>
                                <div className="rounded-md flex items-center justify-center overflow-hidden bg-muted/40 p-4">
                                  <img 
                                    src={component.imagePlaceholder} 
                                    alt="Technical Drawing" 
                                    className="w-auto h-auto max-w-full object-contain"
                                  />
                                </div>
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
