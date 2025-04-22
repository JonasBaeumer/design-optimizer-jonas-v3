
import React from 'react';
import { PartItem } from '@/types/masterDataTypes';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Info } from 'lucide-react';

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
        isInIdenticalGroup && "bg-[#F1F0FB]",
        isBestPick && "bg-[#F2FCE2]",
        isFirstInIdenticalGroup && "rounded-t-lg border-t",
        !isFirstInIdenticalGroup && isInIdenticalGroup && "border-t-0",
        isLastInIdenticalGroup && "rounded-b-lg mb-2",
      )}
    >
      <TableCell className="font-medium">
        {isFirstInIdenticalGroup && (
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
              {identicalGroupSize} Identical Parts
            </Badge>
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
          {item.isDuplicate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 flex items-center gap-1">
                  <Copy size={12} />
                  Duplicate
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  These parts have been identified as identical based on detailed analysis.
                  Consider consolidating to reduce complexity.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {item.isHighlySimilar && !item.isDuplicate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 flex items-center gap-1">
                  <Copy size={12} />
                  Similar
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  This part is highly similar to others in this group.
                  Consider standardizing to one variant.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {isBestPick && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                  Best Pick
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  This part offers the best balance between lead time ({item.leadTime} days) 
                  and price (${item.pricePerUnit.toFixed(2)}). Consolidating to this part
                  is recommended.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PartItemRow;
