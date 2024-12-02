import React from 'react';
import ComponentItem from './ComponentItem';
import { DRAGGABLE_COMPONENTS } from './DraggableComponents';
import { v4 as uuidv4 } from 'uuid';
import { DraggableComponent } from '../../../../types/components';

const LeftSidebar: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, component: DraggableComponent) => {
    // Sürükleme başladığında yeni bir ID oluştur
    const componentWithId = {
      ...component,
      id: `${component.type}-${uuidv4()}`
    };

    e.dataTransfer.setData('component', JSON.stringify(componentWithId));
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white p-4">
      <h2 className="text-sm font-medium text-gray-500 mb-4">COMPONENTS</h2>
      <div className="space-y-2">
        {DRAGGABLE_COMPONENTS.map((component) => (
          <ComponentItem
            key={component.type}
            component={{ ...component, id: `template-${component.type}` }}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;