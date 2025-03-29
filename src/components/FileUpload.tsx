
import React, { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { Upload, AlertTriangle, FileText, X, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
  const ALLOWED_EXTENSIONS = ['txt', 'pdf', 'png', 'jpg', 'jpeg', 'exe', 'dll', 'zip', 'rar'];
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const validateFile = (fileToValidate: File): boolean => {
    // Check file size
    if (fileToValidate.size > MAX_FILE_SIZE) {
      toast.error('File is too large. Maximum size is 16MB.');
      return false;
    }
    
    // Check file extension
    const extension = fileToValidate.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      toast.error(`Invalid file type. Allowed types are: ${ALLOWED_EXTENSIONS.join(', ')}`);
      return false;
    }
    
    return true;
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0]; // Only handle the first file
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to scan');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate a file scanning process
    setTimeout(() => {
      setIsLoading(false);
      
      // Randomly determine if the file is clean or has threats
      const isClean = Math.random() > 0.3;
      
      // Navigate to results page with file data
      navigate('/scan-result', { 
        state: { 
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          scanDate: new Date().toISOString(),
          isClean: isClean,
          threats: isClean ? [] : [
            { type: 'Malware', name: 'Trojan.Generic.12345', severity: 'High' },
            { type: 'PUP', name: 'Adware.BrowserModifier', severity: 'Medium' }
          ]
        }
      });
    }, 2000);
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="scan-card">
      <form onSubmit={handleSubmit}>
        <div 
          className={`drop-zone ${isDragging ? 'highlight' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="file-info">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <FileText className="text-scanberry-primary mr-3" />
                <div className="flex-1">
                  <p className="font-medium truncate" title={file.name}>{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleRemoveFile}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="text-gray-500 h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-scanberry-primary mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Drag & Drop File Here</h3>
              <p className="text-gray-500 mb-4">or</p>
              <button 
                type="button"
                onClick={handleBrowseClick}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Browse Files
              </button>
              <p className="mt-4 text-xs text-gray-500">
                Supported files: {ALLOWED_EXTENSIONS.join(', ')} (Max size: 16MB)
              </p>
            </>
          )}
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept={ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(',')}
          />
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Scan Options</h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Deep Scan (Recommended)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Scan for malware</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-scanberry-primary focus:ring-scanberry-primary" defaultChecked />
              <span>Scan for suspicious behavior</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="scan-button"
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin mr-2"></div>
                Scanning...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-1" />
                Scan Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
