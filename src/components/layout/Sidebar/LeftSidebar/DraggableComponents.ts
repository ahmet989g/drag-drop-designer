import { DraggableComponent } from '../../../../types/components';
import { FormInput, CheckSquare, Image } from 'lucide-react';

export const DRAGGABLE_COMPONENTS: Omit<DraggableComponent, 'id'>[] = [
  {
    type: 'input',
    icon: FormInput,
    label: 'Input Field'
  },
  {
    type: 'checkbox',
    icon: CheckSquare,
    label: 'Checkbox'
  },
  {
    type: 'imageUpload',
    icon: Image,
    label: 'Image Upload'
  }
];