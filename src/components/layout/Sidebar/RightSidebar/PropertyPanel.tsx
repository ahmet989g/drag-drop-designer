import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { updateComponent } from '../../../../store/features/designerSlice';
import { ComponentStyle, ComponentStyles, ComponentProperties } from '../../../../types/components';

const PropertyPanel: React.FC = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.designer.selectedComponentId);
  const component = useSelector((state: RootState) =>
    state.designer.components.find((c: { id: number; }) => c.id === selectedId)
  );

  if (!component) {
    return (
      <div className="text-center text-gray-500 mt-4">
        Select a component to edit its properties
      </div>
    );
  }

  const handleStyleUpdate = (updates: Partial<ComponentStyle>) => {
    const componentType = component.type;
    const styleKey = `${componentType}Style` as keyof ComponentStyles;

    dispatch(updateComponent({
      id: selectedId,
      updates: {
        styles: {
          ...component.styles,
          [styleKey]: {
            ...(component.styles?.[styleKey] || {}),
            ...updates
          }
        }
      }
    }));
  };

  const handlePositionUpdate = (updates: { x?: number; y?: number }) => {
    dispatch(updateComponent({
      id: selectedId,
      updates: {
        position: { ...component.position, ...updates }
      }
    }));
  };

  const handleSizeUpdate = (updates: { width?: number; height?: number }) => {
    dispatch(updateComponent({
      id: selectedId,
      updates: {
        size: { ...component.size, ...updates }
      }
    }));
  };

  const handlePropertyUpdate = (updates: Partial<ComponentProperties>) => {
    dispatch(updateComponent({
      id: selectedId,
      updates: {
        properties: {
          ...component.properties,
          ...updates
        }
      }
    }));
  };

  const getComponentStyles = () => {
    const styleKey = `${component.type}Style` as keyof ComponentStyles;
    return component.styles?.[styleKey] || { backgroundColor: '#ffffff', borderColor: '#e5e7eb' };
  };

  const currentStyles = getComponentStyles();

  return (
    <div className="space-y-6 p-4">
      {/* Component Properties */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Component Properties</h3>
        <div>
          <label className="text-xs text-gray-500">Label</label>
          <input
            type="text"
            value={component.label || ''}
            onChange={(e) => dispatch(updateComponent({
              id: selectedId,
              updates: { label: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {component.type === 'input' && (
          <div>
            <label className="text-xs text-gray-500">Placeholder</label>
            <input
              type="text"
              value={component.properties?.placeholder || ''}
              onChange={(e) => handlePropertyUpdate({ placeholder: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {component.type === 'checkbox' && (
          <div>
            <label className="text-xs text-gray-500">Description</label>
            <input
              type="text"
              value={component.properties?.description || ''}
              onChange={(e) => handlePropertyUpdate({ description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {/* Events */}
        <div>
          <label className="text-xs text-gray-500">onClick Function</label>
          <textarea
            value={component.properties?.onClick || ''}
            onChange={(e) => handlePropertyUpdate({ onClick: e.target.value })}
            placeholder="console.log('clicked');"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Position Values */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Position</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Left (px)</label>
            <input
              type="number"
              value={component.position.x}
              onChange={(e) => handlePositionUpdate({ x: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Top (px)</label>
            <input
              type="number"
              value={component.position.y}
              onChange={(e) => handlePositionUpdate({ y: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Width (px)</label>
            <input
              type="number"
              value={component.size.width}
              onChange={(e) => handleSizeUpdate({ width: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Height (px)</label>
            <input
              type="number"
              value={component.size.height}
              onChange={(e) => handleSizeUpdate({ height: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Style Properties */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Style</h3>
        <div>
          <label className="text-xs text-gray-500">Background Color</label>
          <div className="mt-1">
            <input
              type="color"
              value={currentStyles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500">Border Color</label>
          <div className="mt-1">
            <input
              type="color"
              value={currentStyles.borderColor || '#e5e7eb'}
              onChange={(e) => handleStyleUpdate({ borderColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;