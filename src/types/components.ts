import { LucideIcon } from 'lucide-react';

export type ComponentType = 'input' | 'checkbox' | 'imageUpload';

export interface ComponentProps {
  component: DraggableComponent;
  onDragStart: (e: React.DragEvent, component: DraggableComponent) => void;
}

export interface ComponentProperties {
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  onClick?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ComponentStyle {
  backgroundColor?: string;
  borderColor?: string;
  size?: Size;
  position?: Position;
  label?: string;
  properties?: ComponentProperties;
}

export interface ComponentStyles {
  inputStyle?: ComponentStyle;
  checkboxStyle?: ComponentStyle;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DraggableComponent {
  id: string;
  type: ComponentType;
  icon: LucideIcon;
  label: string;
  properties?: ComponentProperties;
}

export interface CanvasComponent extends Omit<DraggableComponent, 'icon'> {
  iconName: string;
  position: Position;
  size: Size;
  styles: ComponentStyles;
}