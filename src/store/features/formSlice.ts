import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasComponent } from '../../types/components';

interface SavedForm {
  id: string;
  name: string;
  components: CanvasComponent[];
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  savedForms: SavedForm[];
}

const initialState: FormState = {
  savedForms: JSON.parse(localStorage.getItem('savedForms') || '[]')
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<{ name: string; components: CanvasComponent[] }>) => {
      const newForm: SavedForm = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        components: action.payload.components,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.savedForms.push(newForm);
      localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
    },
    updateForm: (state, action: PayloadAction<{ id: string; components: CanvasComponent[] }>) => {
      const form = state.savedForms.find(f => f.id === action.payload.id);
      if (form) {
        form.components = action.payload.components;
        form.updatedAt = new Date().toISOString();
        localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.savedForms = state.savedForms.filter(f => f.id !== action.payload);
      localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
    }
  }
});

export const { saveForm, updateForm, deleteForm } = formSlice.actions;
export default formSlice.reducer;