
import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  FileText, 
  SortAsc, 
  SortDesc 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPartGroups } from '@/data/mockMasterData';
import PartGroupCard from './PartGroupCard';
import { PartGroup, SortField, SortDirection } from '@/types/masterDataTypes';

const DataAnalyzerContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('leadTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Extract all unique suppliers from the data
  const suppliers = useMemo(() => {
    const allSuppliers = new Set<string>();
    allSuppliers.add('All');
    
    mockPartGroups.forEach(group => {
      group.items.forEach(item => {
        allSuppliers.add(item.supplier);
      });
    });
    
    return Array.from(allSuppliers);
  }, []);

  // Filter part groups based on search term
  const filteredPartGroups = useMemo(() => {
    if (!searchTerm) return mockPartGroups;
    
    return mockPartGroups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.items.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.componentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleExport = () => {
    // Logic to export data
    alert('Data export functionality would be implemented here');
  };

  const toggleExpand = (groupId: string) => {
    setExpandedGroupId(expandedGroupId === groupId ? null : groupId);
  };

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSupplierChange = (supplier: string) => {
    setSelectedSupplier(supplier);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search part groups or specific components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <FileText size={18} />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Filter className="text-muted-foreground" size={18} />
        <span className="text-sm font-medium">Filter by Supplier:</span>
        <div className="flex flex-wrap gap-2">
          {suppliers.map(supplier => (
            <Button
              key={supplier}
              variant={selectedSupplier === supplier ? "default" : "outline"}
              size="sm"
              onClick={() => handleSupplierChange(supplier)}
              className="text-xs"
            >
              {supplier}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPartGroups.map((group) => (
          <PartGroupCard
            key={group.id}
            group={group}
            isExpanded={expandedGroupId === group.id}
            onToggleExpand={() => toggleExpand(group.id)}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            selectedSupplier={selectedSupplier}
          />
        ))}
      </div>

      {filteredPartGroups.length === 0 && (
        <div className="text-center py-8">
          <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No matching part groups found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default DataAnalyzerContent;
