import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut, Save, Copy } from 'lucide-react';
import { logout } from '../../store/features/authSlice';

interface HeaderProps {
  onSave: () => void;
  onSaveAs: () => void;
  formName?: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, onSaveAs, formName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formId } = useParams();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="text-lg font-semibold text-gray-800">
        <span className="text-lg font-semibold text-gray-800">Design Editor</span>
        {formName && (
          <span className="text-sm text-gray-500">
            - {formName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link to={"/forms"} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Formlar</Link>
        {formId ? (
          <>
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={onSaveAs}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md"
            >
              <Copy size={18} />
              Save As
            </button>
          </>
        ) : (
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            <Save size={18} />
            Save Form
          </button>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;