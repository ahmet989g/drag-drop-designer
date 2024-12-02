import React, { useState } from 'react';
import { CanvasComponent } from '../../../../types/components';

interface CheckboxFieldProps {
  component: CanvasComponent;
  isEditing: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ component, isEditing }) => {
  const [checked, setChecked] = useState(component.properties?.defaultChecked || false);
  const checkboxStyle = component.styles?.checkboxStyle || { backgroundColor: '#4f46e5', borderColor: '#e5e7eb' };

  return (
    <div className="relative flex items-center p-2">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !isEditing && setChecked(e.target.checked)}
          className="rounded"
          style={{
            width: `${Math.min(component.size.width * 0.2, 20)}px`,
            height: `${Math.min(component.size.width * 0.2, 20)}px`,
            borderColor: checkboxStyle.borderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: checked ? checkboxStyle.backgroundColor : '#ffffff',
            cursor: isEditing ? 'move' : 'pointer',
            accentColor: checkboxStyle.backgroundColor,
          }}
          disabled={isEditing}
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-gray-700">
          {component.label}
        </label>
        {component.properties?.description && (
          <p className="text-gray-500">{component.properties.description}</p>
        )}
      </div>
    </div>
  );
};

export default CheckboxField;