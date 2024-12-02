import { CanvasComponent } from './components';

export interface SavedForm {
  id: string;
  name: string;
  components: CanvasComponent[];
  createdAt: string;
  updatedAt: string;
}