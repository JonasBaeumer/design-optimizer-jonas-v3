// THIS FILE IS NOT USED AND CAN BE DELETED

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";

interface ComponentsListProps {
  components: { name: string; state: "success" | "failed" }[];
}

const ComponentsList: React.FC<ComponentsListProps> = ({ components }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Components Status</h2>
      <ul>
        {components.map((component, index) => {
          const statusText = component.state === "success" ? "OK" : "Failed";
          const Icon = component.state === "success" ? CheckCircle2 : XCircle;
          const state = component.state;

          return (
            <li key={index} className="flex items-center justify-between py-2 border-b">
              <span>{component.name}</span>
              <Badge 
                variant="outline"
                className={cn(
                  "px-2 py-1",
                  state === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}
              >
                {statusText}
              </Badge>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ComponentsList;
