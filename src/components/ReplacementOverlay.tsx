
import React from 'react';
import { X, CheckCircle2, ThumbsUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Subcomponent, ReplacementItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ReplacementOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  subcomponent: Subcomponent | null;
  onReplaceComponent: (replacement: ReplacementItem) => void;
}

const mockReplacements: Record<string, ReplacementItem[]> = {
  'PS-1001R': [
    {
      id: 'r1',
      name: 'Premium Position Sensor',
      partNumber: 'PS-2000X',
      category: 'Electronics',
      stockLevel: 12,
      specifications: {
        'Resolution': '0.0005 mm',
        'Accuracy': '±0.001 mm',
        'Response Time': '2 ms',
        'Output': '0-10V analog signal'
      },
      compatibilityScore: 98,
      isRecommended: true
    },
    {
      id: 'r2',
      name: 'Standard Position Sensor',
      partNumber: 'PS-1500',
      category: 'Electronics',
      stockLevel: 45,
      specifications: {
        'Resolution': '0.002 mm',
        'Accuracy': '±0.004 mm',
        'Response Time': '10 ms',
        'Output': '0-10V analog signal'
      },
      compatibilityScore: 85
    },
    {
      id: 'r3',
      name: 'Economy Position Sensor',
      partNumber: 'PS-1000E',
      category: 'Electronics',
      stockLevel: 78,
      specifications: {
        'Resolution': '0.005 mm',
        'Accuracy': '±0.01 mm',
        'Response Time': '15 ms',
        'Output': '0-10V analog signal'
      },
      compatibilityScore: 72
    }
  ]
};

const ReplacementOverlay: React.FC<ReplacementOverlayProps> = ({ 
  isOpen, 
  onClose, 
  subcomponent, 
  onReplaceComponent 
}) => {
  const { toast } = useToast();
  
  if (!isOpen || !subcomponent) return null;

  // Get the original part number (before any replacements)
  const originalPartNumber = subcomponent.originalPartNumber || subcomponent.partNumber || '';
  const replacements = mockReplacements[originalPartNumber] || [];
  const recommendedItem = replacements.find(item => item.isRecommended);
  const otherItems = replacements.filter(item => !item.isRecommended);

  const handleReplaceComponent = (replacement: ReplacementItem) => {
    onReplaceComponent(replacement);
    toast({
      title: "Component Replaced",
      description: `${subcomponent.name} replaced with ${replacement.name}`,
      variant: "default",
    });
    onClose();
  };

  // Check if this subcomponent has already been replaced
  const isAlreadyReplaced = subcomponent.replacedWith !== undefined;

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-white shadow-xl border-l transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-auto`}>
      <div className="sticky top-0 bg-white z-10 border-b p-4 flex items-center justify-between">
        <h3 className="font-medium">Alternative Components</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Replacing</h4>
          <div className="font-medium flex flex-col gap-1">
            <div>{subcomponent.name.replace(" (Replaced)", "")}</div>
            <div className="text-xs font-mono text-muted-foreground">
              {subcomponent.originalPartNumber || subcomponent.partNumber}
            </div>
            {isAlreadyReplaced && (
              <Badge variant="outline" className="mt-1 w-fit">
                Already replaced with {subcomponent.replacedWith?.name}
              </Badge>
            )}
          </div>
        </div>

        {replacements.length > 0 ? (
          <>
            {recommendedItem && (
              <div className="mb-6">
                <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                  <ThumbsUp className="h-4 w-4 text-purple-500" />
                  Recommended Replacement
                </h4>
                <div className="border rounded-md overflow-hidden bg-green-50/50">
                  <div className="border-l-4 border-purple-500 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{recommendedItem.name}</div>
                        <div className="text-xs font-mono">{recommendedItem.partNumber}</div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        {recommendedItem.compatibilityScore}% Match
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="font-medium text-green-600">{recommendedItem.stockLevel} in stock</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(recommendedItem.specifications).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-muted-foreground">{key}</div>
                          <div>{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleReplaceComponent(recommendedItem)}
                      >
                        {isAlreadyReplaced ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Replace Again
                          </>
                        ) : (
                          "Use This Component"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {otherItems.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Other Alternatives</h4>
                <div className="space-y-3">
                  {otherItems.map(item => (
                    <div key={item.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs font-mono">{item.partNumber}</div>
                        </div>
                        <Badge variant="outline">{item.compatibilityScore}% Match</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>{item.stockLevel} in stock</span>
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReplaceComponent(item)}
                        >
                          {isAlreadyReplaced ? "Replace Again" : "Select"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No alternative components found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplacementOverlay;
