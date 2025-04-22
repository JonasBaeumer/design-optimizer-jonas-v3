
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
  Files, 
  IndentIncrease
} from 'lucide-react';
import PartItemRow from './PartItemRow';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

  // Process items and create a hierarchical structure for display
  const hierarchicalItems: Array<{
    item: PartItem;
    isBestPick: boolean;
    isFirstInIdenticalGroup?: boolean;
    isLastInIdenticalGroup?: boolean;
    identicalGroupSize?: number;
    isIdenticalSubItem?: boolean;
  }> = [];

  // Ensure identical groups come first, sorted by group ID
  Object.entries(groupedItems)
    .sort(([keyA], [keyB]) => {
      if (keyA.startsWith('unique-') && !keyB.startsWith('unique-')) return 1;
      if (!keyA.startsWith('unique-') && keyB.startsWith('unique-')) return -1;
      return keyA.localeCompare(keyB);
    })
    .forEach(([groupKey, items]) => {
      // Sort items within their group
      const sortedItems = [...items].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
          return multiplier * (a[sortField] as string).localeCompare(b[sortField] as string);
        }
        return multiplier * ((a[sortField] as number) - (b[sortField] as number));
      });

      // For identical groups, create a tree structure
      if (!groupKey.startsWith('unique-') && sortedItems.length > 1) {
        sortedItems.forEach((item, index) => {
          const isFirst = index === 0;
          const isLast = index === sortedItems.length - 1;

          hierarchicalItems.push({
            item,
            isBestPick: group.bestPickIds.includes(item.id),
            isFirstInIdenticalGroup: isFirst,
            isLastInIdenticalGroup: isLast,
            identicalGroupSize: sortedItems.length,
            isIdenticalSubItem: !isFirst // Only the first item is not a sub-item
          });
        });
      } else {
        // For unique items, just add them normally
        sortedItems.forEach(item => {
          hierarchicalItems.push({
            item,
            isBestPick: group.bestPickIds.includes(item.id)
          });
        });
      }
    });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggleExpand}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
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
            <CardDescription className="flex justify-between items-center">
              <span>Part Group</span>
              <span className="font-medium">Total Units: {group.totalUnits.toLocaleString()} units across 2023-2025</span>
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
                
                <Alert className="mt-3 bg-blue-50">
                  <Files className="h-4 w-4" />
                  <AlertTitle>Identical Parts Structure</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm">
                      Identical parts are shown in a tree structure with the main item at the top and
                      sub-items indented below with the <IndentIncrease className="inline h-4 w-4" /> icon.
                      All parts in the same blue bordered group are functionally identical and can be consolidated.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px] cursor-pointer" onClick={() => onSortChange('componentId')}>
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
                  {hierarchicalItems.map(({ 
                    item, 
                    isBestPick, 
                    isFirstInIdenticalGroup, 
                    isLastInIdenticalGroup, 
                    identicalGroupSize,
                    isIdenticalSubItem 
                  }, index) => (
                    <PartItemRow 
                      key={item.id} 
                      item={item} 
                      isBestPick={isBestPick}
                      isFirstInIdenticalGroup={isFirstInIdenticalGroup}
                      isLastInIdenticalGroup={isLastInIdenticalGroup}
                      identicalGroupSize={identicalGroupSize}
                      isIdenticalSubItem={isIdenticalSubItem}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          {identicalGroups.size > 0 && (
            <CardFooter className="border-t bg-slate-50/50 py-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Files size={14} className="mr-2" />
                <span>Parts with <IndentIncrease size={14} className="mx-1 inline" /> icons are sub-items that are identical to the part above them.</span>
              </div>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};

export default PartGroupCard;
