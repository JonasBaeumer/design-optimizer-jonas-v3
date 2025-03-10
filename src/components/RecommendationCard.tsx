
import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Check, ArrowRightLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Recommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const [accepted, setAccepted] = React.useState(recommendation.accepted);
  const [rejected, setRejected] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setRejected(false);
  };

  const handleReject = () => {
    setRejected(true);
    setAccepted(false);
  };

  const compatibilityColor = () => {
    if (recommendation.compatibilityScore >= 0.9) return 'text-green-600';
    if (recommendation.compatibilityScore >= 0.7) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      className={`rounded-md border relative transition-all ${
        expanded ? 'bg-card shadow-soft' : 'bg-card/50'
      } ${
        accepted ? 'border-green-200 bg-green-50/50' : rejected ? 'border-red-200 bg-red-50/50' : 'border-border'
      }`}
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium">
                Replace {recommendation.originalComponent.name} with {recommendation.recommendedComponent.name}
              </h4>
              <Badge variant="outline" className="text-xs">
                {recommendation.type === 'part' ? 'Part-level' : 'Module-level'}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {!expanded && recommendation.rationale.substring(0, 120)}
              {!expanded && recommendation.rationale.length > 120 && '...'}
            </div>

            <div className="mt-2 flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <span className="text-muted-foreground mr-1">Compatibility:</span>
                <span className={compatibilityColor()}>
                  {Math.round(recommendation.compatibilityScore * 100)}%
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-1">Savings:</span>
                <span className="text-green-600">
                  ${recommendation.costSavings.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          className="px-4 pb-4 pt-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="border-t border-border pt-3 mt-1">
            <h5 className="text-xs font-medium mb-2">Rationale</h5>
            <p className="text-xs text-muted-foreground mb-4">{recommendation.rationale}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 p-3 rounded-md">
                <h5 className="text-xs font-medium flex items-center">
                  <Info className="h-3 w-3 mr-1 text-muted-foreground" />
                  Original Component
                </h5>
                <div className="mt-2">
                  <div className="text-xs font-medium">
                    {recommendation.originalComponent.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recommendation.originalComponent.partNumber}
                  </div>
                  <div className="mt-2 text-[11px] leading-normal text-muted-foreground">
                    {Object.entries(recommendation.originalComponent.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between mb-1">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value.toString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 p-3 rounded-md">
                <h5 className="text-xs font-medium flex items-center">
                  <Info className="h-3 w-3 mr-1 text-primary" />
                  Recommended Component
                </h5>
                <div className="mt-2">
                  <div className="text-xs font-medium">
                    {recommendation.recommendedComponent.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recommendation.recommendedComponent.partNumber}
                  </div>
                  <div className="mt-2 text-[11px] leading-normal text-muted-foreground">
                    {Object.entries(recommendation.recommendedComponent.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between mb-1">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value.toString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={rejected ? "default" : "outline"} 
                      size="sm" 
                      className={rejected ? "bg-red-500 hover:bg-red-600" : "text-red-500 hover:text-red-600"}
                      onClick={handleReject}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1.5" />
                      Reject
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reject this recommendation</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={accepted ? "default" : "outline"} 
                      size="sm" 
                      className={accepted ? "bg-green-500 hover:bg-green-600" : "text-green-600 hover:text-green-700"}
                      onClick={handleAccept}
                    >
                      {accepted ? (
                        <>
                          <Check className="h-4 w-4 mr-1.5" />
                          Accepted
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="h-4 w-4 mr-1.5" />
                          Accept
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Accept this recommendation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecommendationCard;
