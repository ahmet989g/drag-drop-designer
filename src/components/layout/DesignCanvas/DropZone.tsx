import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'lucide-react';
import { addComponent, selectComponent, updateComponent } from '../../../store/features/designerSlice';
import { CanvasComponent, DraggableComponent, Position } from '../../../types/components';
import { RootState } from '../../../store';
import FormComponents from './FormComponents';
import DragGuides from './DragGuides';

const DropZone: React.FC = () => {
  const dispatch = useDispatch();
  const components = useSelector((state: RootState) => state.designer.components);
  const selectedId = useSelector((state: RootState) => state.designer.selectedComponentId);

  const [draggedComponentId, setDraggedComponentId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mouseOffset = useRef({ x: 0, y: 0 });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const dropzone = e.currentTarget.getBoundingClientRect();

    setDragPosition({
      x: e.clientX - dropzone.left - mouseOffset.current.x,
      y: e.clientY - dropzone.top - mouseOffset.current.y
    });
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.stopPropagation(); // Event bubbling'i engelle

    const element = e.currentTarget.getBoundingClientRect();
    mouseOffset.current = {
      x: e.clientX - element.left,
      y: e.clientY - element.top
    };

    setDraggedComponentId(id);
    setIsDragging(true);

    // Sadece komponentin ID'sini sakla
    e.dataTransfer.setData('componentId', id);

    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    document.body.style.cursor = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropzone = e.currentTarget.getBoundingClientRect();

    const position = {
      x: e.clientX - dropzone.left - mouseOffset.current.x,
      y: e.clientY - dropzone.top - mouseOffset.current.y
    };

    // Eğer mevcut bir komponenti taşıyorsak
    if (draggedComponentId) {
      dispatch(updateComponent({
        id: draggedComponentId,
        updates: { position }
      }));
    } else {
      // Yeni bir komponent ekliyorsak
      try {
        const componentData = JSON.parse(e.dataTransfer.getData('component')) as DraggableComponent;
        dispatch(addComponent({ component: componentData, position }));
      } catch (error) {
        console.error('Failed to parse component data:', error);
      }
    }

    handleDragEnd();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragPosition(null);
    setDraggedComponentId(null);
    mouseOffset.current = { x: 0, y: 0 };
    document.body.style.cursor = 'default';
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(selectComponent(null));
    }
  };

  const getDraggedComponent = () => {
    return components.find((comp: DraggableComponent) => comp.id === draggedComponentId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
      className="relative h-full border-2 border-dashed border-gray-300 rounded-lg bg-white/50 overflow-hidden"
    >
      {components.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Layout size={48} className="text-gray-400 mb-2" />
          <p className="text-gray-500">Drag and drop components here</p>
        </div>
      )}

      {/* Canvas üzerindeki komponentler */}
      {components.map((component: CanvasComponent) => (
        <FormComponents
          key={component.id}
          component={component}
          isEditing={component.id === selectedId}
          onDragStart={handleDragStart}
          style={{
            position: 'absolute',
            left: component.position.x,
            top: component.position.y,
            opacity: draggedComponentId === component.id ? 0.3 : 1,
            cursor: 'move'
          }}
        />
      ))}

      {/* Sürükleme önizlemesi */}
      {isDragging && dragPosition && draggedComponentId && (
        <FormComponents
          component={getDraggedComponent()!}
          isEditing={false}
          onDragStart={() => { }}
          style={{
            position: 'absolute',
            left: dragPosition.x,
            top: dragPosition.y,
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
            borderRadius: '0.375rem'
          }}
        />
      )}

      {/* Kılavuz çizgileri */}
      {dragPosition && (
        <DragGuides
          position={dragPosition}
          canvasComponents={components}
          activeId={draggedComponentId}
        />
      )}
    </div>
  );
};

export default DropZone;