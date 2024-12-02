import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectComponent } from "../../../../store/features/designerSlice";
import { RootState } from '../../../../store';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import ImageUploadField from './ImageUploadField';
import { CanvasComponent } from '../../../../types/components';

interface FormComponentProps {
  component: CanvasComponent;
  isEditing: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  style?: React.CSSProperties;
}

const FormComponents: React.FC<FormComponentProps> = ({
  component,
  isEditing,
  onDragStart,
  style
}) => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.designer.selectedComponentId);
  const isSelected = selectedId === component.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectComponent(component.id));
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'input':
        return <InputField component={component} isEditing={isEditing} />;
      case 'checkbox':
        return <CheckboxField component={component} isEditing={isEditing} />;
      case 'imageUpload':
        return <ImageUploadField component={component} isEditing={isEditing} />;
      default:
        return <div>Unsupported component type</div>;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, component.id)}
      onClick={handleClick}
      style={{
        ...style,
        cursor: 'move',
      }}
      className={`relative ${isSelected
        ? 'ring-2 ring-indigo-500 ring-offset-2'
        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
        }`}
    >
      {renderComponent()}

      {/* Seçim göstergesi */}
      {isSelected && (
        <div className="absolute -inset-1 border-1 border-indigo-500 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default FormComponents;