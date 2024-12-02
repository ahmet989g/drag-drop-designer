import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { CanvasComponent } from '../../../../types/components';

interface ImageUploadFieldProps {
  component: CanvasComponent;
  isEditing: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ component, isEditing }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isEditing) {
    return (
      <div className="relative bg-white rounded-md border border-gray-300 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {component.label}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <Upload className="h-12 w-12 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-white rounded-md border border-gray-300 p-2"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
      </label>
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-auto rounded-md"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md 
                     hover:border-indigo-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;