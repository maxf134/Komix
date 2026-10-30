import { useState } from 'react';
import { ComicPanel, ComicElement } from '../types';
import { EditableElement } from './EditableElement';
import { X, ZoomIn, ZoomOut, RotateCw, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { ControlPanel } from './ControlPanel';

interface PanelEditorProps {
  panel: ComicPanel;
  onUpdateElement: (elementId: string, updates: Partial<ComicElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onAddElement: (type: 'bubble' | 'bodypart' | 'effect' | 'object', subType?: string, characterType?: string) => void;
  onMoveToFront: (panelId: string, elementId: string) => void;
  onMoveToBack: (panelId: string, elementId: string) => void;
  onClose: () => void;
}

export function PanelEditor({ 
  panel, 
  onUpdateElement, 
  onDeleteElement, 
  onAddElement,
  onMoveToFront,
  onMoveToBack,
  onClose 
}: PanelEditorProps) {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  const selectedElement = panel.elements.find(el => el.id === selectedElementId);

  const handleScale = (delta: number) => {
    if (!selectedElement) return;
    const currentScale = selectedElement.scale || 1;
    const newScale = Math.max(0.3, Math.min(3, currentScale + delta));
    onUpdateElement(selectedElement.id, { scale: newScale });
  };

const handleRotate = (direction: 'left' | 'right') => {
  if (!selectedElement) return;
  const currentRotation = selectedElement.rotation || 0;
  const newRotation = direction === 'right' 
    ? (currentRotation + 60) % 360 
    : (currentRotation - 60 + 360) % 360;
  onUpdateElement(selectedElement.id, { rotation: newRotation });
};

  const handleMoveToFront = () => {
    if (!selectedElement) return;
    onMoveToFront(panel.id, selectedElement.id);
  };

  const handleMoveToBack = () => {
    if (!selectedElement) return;
    onMoveToBack(panel.id, selectedElement.id);
  };

  const handleDelete = () => {
    if (!selectedElement) return;
    onDeleteElement(selectedElement.id);
    setSelectedElementId(null);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex overflow-hidden">
      {/* Левая панель управления */}
      <div className="w-64 h-full overflow-y-auto bg-black/95 border-r-2 border-white/30">
        <div className="p-4 border-b border-white/30">
          <h2 className="text-xl font-bold text-center text-white">🎨 Редактор</h2>
        </div>
        <ControlPanel
          onAddPanel={() => {}}
          onAddElement={onAddElement}
          selectedPanelId={panel.id}
        />
      </div>

      {/* Основная область */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 bg-white/20 hover:bg-white/30 transition-colors rounded-full p-3 text-white z-10"
          title="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Панель инструментов для выбранного элемента */}
        {selectedElement && (
          <div className="fixed top-4 left-80 bg-black/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 z-10 border border-white/30">
            <span className="text-white text-sm mr-2 font-semibold">Инструменты:</span>
            
            {/* Масштабирование - для всех типов */}
            <button
              onClick={() => handleScale(0.2)}
              className="text-white hover:text-green-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Увеличить"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScale(-0.2)}
              className="text-white hover:text-yellow-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Уменьшить"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            {/* Поворот - для всех типов */}
            <button
              onClick={() => handleRotate('left')}
              className="text-white hover:text-purple-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Повернуть влево"
            >
              <RotateCw className="w-4 h-4 scale-x-[-1]" />
            </button>
            <button
              onClick={() => handleRotate('right')}
              className="text-white hover:text-purple-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Повернуть вправо"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            
            {/* Управление слоями - для всех типов */}
            <button
              onClick={handleMoveToFront}
              className="text-white hover:text-blue-400 transition-colors p-1.5 bg-white/10 rounded"
              title="На передний план"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={handleMoveToBack}
              className="text-white hover:text-cyan-400 transition-colors p-1.5 bg-white/10 rounded"
              title="На задний план"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            
            {/* Удаление - для всех типов */}
            <button
              onClick={handleDelete}
              className="text-white hover:text-red-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Удалить"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Панель в полном размере */}
        <div className="relative">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">{panel.title}</h2>
          
          <div
            className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
            style={{
              width: '850px',
              height: '600px',
              background: panel.background,
            }}
          >
            {/* Элементы */}
            {panel.elements.map((element) => (
              <div key={element.id}>
                <EditableElement
                  element={element}
                  onUpdate={(updates) => onUpdateElement(element.id, updates)}
                  onDelete={() => onDeleteElement(element.id)}
                  isSelected={element.id === selectedElementId}
                  onSelect={() => setSelectedElementId(element.id)}
                />
              </div>
            ))}

            {/* Рамка комикса */}
            <div className="absolute inset-0 border-8 border-black pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}