import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layout/Header';
import LeftSidebar from '../../components/layout/Sidebar/LeftSidebar';
import DesignCanvas from '../../components/layout/DesignCanvas';
import RightSidebar from '../../components/layout/Sidebar/RightSidebar';
import SaveFormModal from '../../components/modals/SaveFormModal';
import { saveForm, updateForm } from '../../store/features/formSlice';
import { loadForm, clearDesigner } from '../../store/features/designerSlice';
import { RootState } from '../../store';
import { SavedForm } from '../../types/forms';

type SaveMode = 'save' | 'saveAs';

const Designer: React.FC = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveMode, setSaveMode] = useState<SaveMode>('save');

  const components = useSelector((state: RootState) => state.designer.components);
  const savedForms = useSelector((state: RootState) => state.forms.savedForms);
  const currentForm = savedForms.find((form: SavedForm) => form.id === formId);

  useEffect(() => {
    if (formId && currentForm) {
      // Form varsa komponentleri yükle
      dispatch(loadForm(currentForm.components));
    } else {
      // Yeni form oluşturuluyorsa designer'ı temizle
      dispatch(clearDesigner());
    }
  }, [formId, currentForm, dispatch]);

  const handleSave = (name: string) => {
    if (saveMode === 'save' && formId) {
      // Mevcut formu güncelle
      dispatch(updateForm({ id: formId, components }));
      navigate('/forms');
    } else {
      // Yeni form olarak kaydet
      dispatch(saveForm({ name, components }));
      navigate('/forms');
    }
  };

  const handleSaveClick = () => {
    if (formId) {
      // Direkt güncelle
      dispatch(updateForm({ id: formId, components }));
      navigate('/forms');
    } else {
      // Yeni kayıt için modal aç
      setSaveMode('save');
      setIsSaveModalOpen(true);
    }
  };

  const handleSaveAsClick = () => {
    setSaveMode('saveAs');
    setIsSaveModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        onSave={handleSaveClick}
        onSaveAs={handleSaveAsClick}
        formName={currentForm?.name}
      />
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <DesignCanvas />
        <RightSidebar />
      </div>

      <SaveFormModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        initialName={saveMode === 'saveAs' ? `${currentForm?.name} (Copy)` : ''}
      />
    </div>
  );
};

export default Designer;