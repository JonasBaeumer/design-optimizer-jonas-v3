
import React, { useState } from 'react';
import { PartGroup, SortField, SortDirection, PartItem } from '@/types/masterDataTypes';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ArrowDown, 
  ArrowUp, 
  SortAsc, 
  SortDesc,
  Files 
} from 'lucide-react';
import PartItemRow from './PartItemRow';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PartGroupCardProps {
  group: PartGroup;
  isExpanded: boolean;
  onToggleExpand: () => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField) => void;
  selectedSupplier: string;
}

const PartGroupCard: React.FC<PartGroupCardProps> = ({
  group,
  isExpanded,
  onToggleExpand,
  sortField,
  sortDirection,
  onSortChange,
  selectedSupplier
}) => {
  const [showIdenticalOnly, setShowIdenticalOnly] = useState(false);
  
  // Filter items by selected supplier
  const filteredItems = selectedSupplier === 'All' 
    ? group.items 
    : group.items.filter(item => item.supplier === selectedSupplier);

  // Count identical groups
  const identicalGroups = new Set<string>();
  filteredItems.forEach(item => {
    if (item.identicalGroupId) {
      identicalGroups.add(item.identicalGroupId);
    }
  });
  
  // Further filter if showing identical only
  const displayItems = showIdenticalOnly 
    ? filteredItems.filter(item => item.identicalGroupId)
    : filteredItems;

  // Group identical parts together
  const groupedItems = displayItems.reduce((acc, item) => {
    const key = item.identicalGroupId || `unique-${item.id}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, PartItem[]>);

  // Flatten and order items, ensuring identical groups stay together
  const orderedItems: PartItem[] = Object.entries(groupedItems)
    .sort(([keyA], [keyB]) => {
      // Ensure identical items come first, sorted by group ID
      if (keyA.startsWith('unique-') && !keyB.startsWith('unique-')) return 1;
      if (!keyA.startsWith('unique-') && keyB.startsWith('unique-')) return -1;
      return keyA.localeCompare(keyB);
    })
    .flatMap(([groupKey, items]) => {
      // Sort items within their group
      const sortedItems = [...items].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
          return multiplier * (a[sortField] as string).localeCompare(b[sortField] as string);
        }
        return multiplier * ((a[sortField] as number) - (b[sortField] as number));
      });
      return sortedItems;
    });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggleExpand}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {group.name}
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {filteredItems.length} items
              </span>
              {identicalGroups.size > 0 && (
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  <Files size={12} className="mr-1" /> {identicalGroups.size} identical groups
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Total Units: {group.totalUnits.toLocaleString()} units across 2023-2025
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}>
            {isExpanded ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <>
          <CardContent>
            {identicalGroups.size > 0 && (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={showIdenticalOnly ? "bg-blue-100" : ""}
                  onClick={() => setShowIdenticalOnly(!showIdenticalOnly)}
                >
                  <Files size={16} className="mr-2" />
                  {showIdenticalOnly ? "Show All Parts" : "Show Only Identical Parts"}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Identical parts are grouped together with blue borders and backgrounds.
                  These are parts that serve the same function but come from different suppliers.
                </p>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] cursor-pointer" onClick={() => onSortChange('componentId')}>
                      <div className="flex items-center gap-1">
                        Component ID {renderSortIcon('componentId')}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('supplier')}>
                      <div className="flex items-center gap-1">
                        Supplier {renderSortIcon('supplier')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => onSortChange('quantity2023')}>
                      <div className="flex items-center gap-1 justify-end">
                        2023 Qty {renderSortIcon('quantity2023')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => onSortChange('quantity2024')}>
                      <div className="flex items-center gap-1 justify-end">
                        2024 Qty {renderSortIcon('quantity2024')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => onSortChange('quantity2025')}>
                      <div className="flex items-center gap-1 justify-end">
                        2025 Qty {renderSortIcon('quantity2025')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => onSortChange('leadTime')}>
                      <div className="flex items-center gap-1 justify-end">
                        Lead Time (days) {renderSortIcon('leadTime')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => onSortChange('pricePerUnit')}>
                      <div className="flex items-center gap-1 justify-end">
                        Price/Unit ($) {renderSortIcon('pricePerUnit')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        Status
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={14} className="text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">
                              Items are analyzed for similarity and potential consolidation.
                              Green items represent the best balance between lead time and price.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderedItems.map((item, index) => {
                    const identicalGroup = Object.values(groupedItems)
                      .find(group => group.includes(item));
                    
                    const isFirstInGroup = identicalGroup && identicalGroup[0] === item;
                    const isLastInGroup = identicalGroup && identicalGroup[identicalGroup.length - 1] === item;
                    
                    return (
                      <PartItemRow 
                        key={item.id} 
                        item={item} 
                        isBestPick={group.bestPickIds.includes(item.id)}
                        isFirstInIdenticalGroup={isFirstInGroup}
                        isLastInIdenticalGroup={isLastInGroup}
                        identicalGroupSize={identicalGroup?.length}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          {identicalGroups.size > 0 && (
            <CardFooter className="border-t bg-slate-50/50 py-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Files size={14} className="mr-2" />
                <span>Parts with the same blue border belong to the same identical group.</span>
              </div>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};

export default PartGroupCard;
