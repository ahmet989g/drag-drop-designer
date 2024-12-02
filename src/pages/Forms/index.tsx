import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteForm } from '../../store/features/formSlice';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { SavedForm } from '../../types/forms';

const FormsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.savedForms);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      dispatch(deleteForm(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Forms</h1>
          <button
            onClick={() => navigate('/designer')}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Plus size={20} className="mr-2" />
            Create New Form
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 gap-4 p-4 font-medium text-gray-500 border-b">
            <div>Form Name</div>
            <div>Created At</div>
            <div>Last Updated</div>
            <div className="text-right">Actions</div>
          </div>

          {forms.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No forms created yet. Start by creating a new form!
            </div>
          ) : (
            forms.map((form: SavedForm) => (
              <div key={form.id} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50">
                <div className="font-medium text-gray-900">{form.name}</div>
                <div className="text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString()}
                </div>
                <div className="text-gray-500">
                  {new Date(form.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => navigate(`/designer/${form.id}`)}
                    className="p-2 text-gray-400 hover:text-indigo-600"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(form.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FormsPage;