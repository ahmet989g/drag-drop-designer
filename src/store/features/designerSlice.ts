import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableComponent, Position, Size } from '../../types/components';

// Component style interfaces
interface ComponentStyle {
  backgroundColor?: string;
  borderColor?: string;
}

interface ComponentStyles {
  inputStyle?: ComponentStyle;
  checkboxStyle?: ComponentStyle;
}

// Stored component interface
interface StoredComponent extends Omit<DraggableComponent, 'icon'> {
  iconName: string;
  position: Position;
  size: Size;
  styles: ComponentStyles;
}

interface DesignerState {
  components: StoredComponent[];
  selectedComponentId: string | null;
}

const initialState: DesignerState = {
  components: [],
  selectedComponentId: null,
};

const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<{
      component: DraggableComponent;
      position: Position;
    }>) => {
      const { component, position } = action.payload;
      
      state.components.push({
        ...component,
        position,
        size: { width: 200, height: 40 },
        styles: {
          inputStyle: {
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
          },
          checkboxStyle: {
            backgroundColor: '#4f46e5',
            borderColor: '#e5e7eb',
          }
        },
        iconName: component.icon.displayName || 'Default',
      });
    },
    updateComponent: (state, action: PayloadAction<{
      id: string;
      updates: Partial<Omit<StoredComponent, 'id' | 'iconName'>>;
    }>) => {
      const { id, updates } = action.payload;
      const component = state.components.find(c => c.id === id);
      if (component) {
        Object.assign(component, updates);
      }
    },
    selectComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(c => c.id !== action.payload);
      if (state.selectedComponentId === action.payload) {
        state.selectedComponentId = null;
      }
    },
    loadForm: (state, action: PayloadAction<StoredComponent[]>) => {
      state.components = action.payload;
      state.selectedComponentId = null;
    },
    clearDesigner: (state) => {
      state.components = [];
      state.selectedComponentId = null;
    }
  },
});

export const {
  addComponent,
  updateComponent,
  selectComponent,
  removeComponent,
  loadForm,
  clearDesigner,
} = designerSlice.actions;

export default designerSlice.reducer;