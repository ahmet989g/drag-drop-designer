import React, { useState } from 'react';
import { CanvasComponent } from '../../../../types/components';

interface InputFieldProps {
  component: CanvasComponent;
  isEditing: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ component, isEditing }) => {
  const [value, setValue] = useState(component.properties?.defaultValue || '');
  const inputStyle = component.styles?.inputStyle || { backgroundColor: '#ffffff', borderColor: '#e5e7eb' };

  return (
    <div className="relative rounded-md p-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500"
        placeholder={component.properties?.placeholder || 'Enter text'}
        style={{
          backgroundColor: inputStyle.backgroundColor,
          borderColor: inputStyle.borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          height: `${component.size.height - 20}px`,
        }}
        disabled={isEditing}
      />
    </div>
  );
};

export default InputField;