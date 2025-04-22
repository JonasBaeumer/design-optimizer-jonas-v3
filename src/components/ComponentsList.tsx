
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export interface ComponentsListProps {
  onNavigateToChat?: () => void;
}

const ComponentsList: React.FC<ComponentsListProps> = ({ onNavigateToChat }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Required Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is where your required components would be listed.
            </p>
            {onNavigateToChat && (
              <button
                onClick={onNavigateToChat}
                className="text-sm text-primary hover:underline"
              >
                Ask HUGO for assistance
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsList;
