import React from 'react';
import { ComponentProps } from '../../../../types/components';

const ComponentItem: React.FC<ComponentProps> = ({ component, onDragStart }) => {
  const Icon = component.icon;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, component)}
      className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move 
                 hover:border-indigo-500 transition-colors flex items-center gap-2"
    >
      <Icon size={18} className="text-gray-600" />
      <span className="text-sm text-gray-700">{component.label}</span>
    </div>
  );
};

export default ComponentItem;