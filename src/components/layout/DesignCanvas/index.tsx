import React from 'react';
import DropZone from './DropZone';

const DesignCanvas: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <DropZone />
    </div>
  );
};

export default DesignCanvas;