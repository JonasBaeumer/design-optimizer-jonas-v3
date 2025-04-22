
import React from 'react';
import { PartItem } from '@/types/masterDataTypes';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Files, CircleCheck, IndentIncrease } from 'lucide-react';

interface PartItemRowProps {
  item: PartItem;
  isBestPick: boolean;
  isFirstInIdenticalGroup?: boolean;
  isLastInIdenticalGroup?: boolean;
  identicalGroupSize?: number;
  isIdenticalSubItem?: boolean;
}

const PartItemRow: React.FC<PartItemRowProps> = ({ 
  item, 
  isBestPick,
  isFirstInIdenticalGroup,
  isLastInIdenticalGroup,
  identicalGroupSize,
  isIdenticalSubItem
}) => {
  const isInIdenticalGroup = item.identicalGroupId !== undefined;

  return (
    <TableRow 
      className={cn(
        "transition-colors",
        isInIdenticalGroup && !isFirstInIdenticalGroup && "bg-blue-50/80", // Blue background for identical sub-items
        isBestPick && "bg-green-100", // Green background for best consolidation pick
        isFirstInIdenticalGroup && "border-t-2 border-l-2 border-r-2 border-blue-400", // Top, left, right borders for first in group
        isLastInIdenticalGroup && "border-b-2 border-l-2 border-r-2 border-blue-400", // Bottom, left, right borders for last in group
        !isFirstInIdenticalGroup && !isLastInIdenticalGroup && isInIdenticalGroup && "border-l-2 border-r-2 border-blue-400", // Side borders for middle items
        "hover:bg-gray-50" // Consistent hover state
      )}
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {isIdenticalSubItem && (
            <span className="inline-flex items-center ml-6 text-blue-500">
              <IndentIncrease size={14} className="mr-1" />
            </span>
          )}
          
          {isInIdenticalGroup && isFirstInIdenticalGroup && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="bg-blue-100 text-blue-700 flex items-center gap-1 whitespace-nowrap min-w-20"
                >
                  <Files size={12} /> 
                  {identicalGroupSize ? `Identical (${identicalGroupSize})` : 'Identical'}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="w-64">
                <p>This part belongs to identical group #{item.identicalGroupId}.</p>
                <p>These parts are identical and sourced from different suppliers.</p>
                <p>Consider consolidating them to reduce complexity.</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          <span className={cn(
            isIdenticalSubItem ? "font-normal" : "font-medium"
          )}>
            {item.componentId}
          </span>
        </div>
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
                  className="bg-green-100 text-green-700 flex items-center gap-1 whitespace-nowrap"
                >
                  <CircleCheck size={14} /> Best Consolidation
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
