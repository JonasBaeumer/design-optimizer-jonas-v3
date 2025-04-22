import React from 'react';
import { PartGroup, SortField, SortDirection, PartItem } from '@/types/masterDataTypes';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription
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
  SortDesc 
} from 'lucide-react';
import PartItemRow from './PartItemRow';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

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
  // Filter items by selected supplier
  const filteredItems = selectedSupplier === 'All' 
    ? group.items 
    : group.items.filter(item => item.supplier === selectedSupplier);

  // Group identical parts together
  const groupedItems = filteredItems.reduce((acc, item) => {
    const key = item.identicalGroupId || 'unique';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, PartItem[]>);

  // Flatten and order items, ensuring identical groups stay together
  const orderedItems: PartItem[] = Object.entries(groupedItems)
    .sort(([keyA], [keyB]) => {
      // Ensure non-identical items are sorted last
      if (keyA === 'unique' && keyB !== 'unique') return 1;
      if (keyB === 'unique' && keyA !== 'unique') return -1;
      return 0;
    })
    .flatMap(([groupKey, items]) => {
      // Sort items within their group
      const sortedItems = [...items].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
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
        <CardContent>
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
      )}
    </Card>
  );
};

export default PartGroupCard;
