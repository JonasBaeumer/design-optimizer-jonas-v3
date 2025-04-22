
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface FileDisplayProps {
  files: File[];
}

const FileDisplay: React.FC<FileDisplayProps> = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      {files.map((file, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileSpreadsheet className="h-4 w-4" />
          <span>{file.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FileDisplay;
