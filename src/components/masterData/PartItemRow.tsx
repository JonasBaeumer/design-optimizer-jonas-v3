
import React from 'react';
import { PartItem } from '@/types/masterDataTypes';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { copy, info } from 'lucide-react';

interface PartItemRowProps {
  item: PartItem;
  isBestPick: boolean;
}

const PartItemRow: React.FC<PartItemRowProps> = ({ item, isBestPick }) => {
  return (
    <TableRow className={isBestPick ? 'bg-[#F2FCE2]' : ''}>
      <TableCell className="font-medium">{item.componentId}</TableCell>
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
                  <copy size={12} />
                  Duplicate
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  This part is a duplicate of another in the system.
                  Consider consolidating to reduce inventory complexity.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {item.isHighlySimilar && !item.isDuplicate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 flex items-center gap-1">
                  <copy size={12} />
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
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
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
