
import React from 'react';
import { PartItem } from '@/types/masterDataTypes';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Files, ShieldCheck } from 'lucide-react';

interface PartItemRowProps {
  item: PartItem;
  isBestPick: boolean;
  isFirstInIdenticalGroup?: boolean;
  isLastInIdenticalGroup?: boolean;
  identicalGroupSize?: number;
}

const PartItemRow: React.FC<PartItemRowProps> = ({ 
  item, 
  isBestPick,
  isFirstInIdenticalGroup,
  isLastInIdenticalGroup,
  identicalGroupSize
}) => {
  const isInIdenticalGroup = item.identicalGroupId !== undefined;

  return (
    <TableRow 
      className={cn(
        "transition-colors",
        isInIdenticalGroup && "bg-blue-50/50", // Light blue background for identical group
        isBestPick && "bg-green-100", // Green background for best consolidation pick
        isFirstInIdenticalGroup && "border-t-2 border-blue-200", // Border for first in group
        isLastInIdenticalGroup && "border-b-2 border-blue-200", // Border for last in group
        "hover:bg-gray-50" // Consistent hover state
      )}
    >
      <TableCell className="font-medium relative">
        {isFirstInIdenticalGroup && (
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <Tooltip>
              <TooltipTrigger>
                <Badge 
                  variant="outline" 
                  className="bg-blue-100 text-blue-700 flex items-center gap-1"
                >
                  <Files size={12} /> Identical
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                These parts are identical and sourced from different suppliers. 
                Consider consolidating them to reduce complexity.
              </TooltipContent>
            </Tooltip>
          </div>
        )}
        {item.componentId}
      </TableCell>
      <TableCell>{item.supplier}</TableCell>
      <TableCell className="text-right">{item.quantity2023.toLocaleString()}</TableCell>
      <TableCell className="text-right">{item.quantity2024.toLocaleString()}</TableCell>
      <TableCell className="text-right">{item.quantity2025.toLocaleString()}</TableCell>
      <TableCell className="text-right">{item.leadTime}</TableCell>
      <TableCell className="text-right">${item.pricePerUnit.toFixed(2)}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {isBestPick && (
            <Tooltip>
              <TooltipTrigger>
                <Badge 
                  variant="outline" 
                  className="bg-green-100 text-green-700 flex items-center gap-1"
                >
                  <ShieldCheck size={14} /> Best Consolidation
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                This part offers the best balance between lead time and price.
                Recommended for consolidation.
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PartItemRow;
