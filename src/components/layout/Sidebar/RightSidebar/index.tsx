import React from 'react';
import PropertyPanel from './PropertyPanel';

const RightSidebar: React.FC = () => {
  return (
    <div className="w-80 border-l border-gray-200 bg-white p-4 overflow-y-auto">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Properties</h2>
      <PropertyPanel />
    </div>
  );
};

export default RightSidebar;