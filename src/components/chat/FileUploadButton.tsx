
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadButtonProps {
  onFileSelect: (files: FileList) => void;
  disabled?: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        multiple
        className="hidden"
        disabled={disabled}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        disabled={disabled}
        className="hover:bg-accent"
        title="Upload Excel files"
        type="button" // Important: prevent form submission
      >
        <Upload className="h-4 w-4" />
        <span className="sr-only">Upload Excel files</span>
      </Button>
    </>
  );
};

export default FileUploadButton;
