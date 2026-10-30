import { ComicPanel as ComicPanelType, ComicElement } from '../types';
import { EditableElement } from './EditableElement';
import { Edit, Trash2, ZoomIn, ZoomOut, RotateCw, Palette, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

interface ComicPanelProps {
  panel: ComicPanelType;
  onUpdateElement: (panelId: string, elementId: string, updates: Partial<ComicElement>) => void;
  onDeleteElement: (panelId: string, elementId: string) => void;
  onDeletePanel: (panelId: string) => void;
  onMoveToFront: (panelId: string, elementId: string) => void;
  onMoveToBack: (panelId: string, elementId: string) => void;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  selectedElementId: string | null;
  onSelectElement: (elementId: string | null) => void;
  canDelete: boolean;
}

export function ComicPanel({ 
  panel, 
  onUpdateElement, 
  onDeleteElement, 
  onDeletePanel,
  onMoveToFront,
  onMoveToBack,
  isSelected, 
  onClick, 
  onEdit,
  selectedElementId,
  onSelectElement,
  canDelete
}: ComicPanelProps) {
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const selectedElement = panel.elements.find(el => el.id === selectedElementId);
  
  const handleScale = (delta: number) => {
    if (!selectedElement) return;
    const currentScale = selectedElement.scale || 1;
    const newScale = Math.max(0.3, Math.min(3, currentScale + delta));
    onUpdateElement(panel.id, selectedElement.id, { scale: newScale });
  };

  const handleRotate = () => {
    if (!selectedElement) return;
    const currentRotation = selectedElement.rotation || 0;
    const newRotation = (currentRotation + 60) % 360;
    onUpdateElement(panel.id, selectedElement.id, { rotation: newRotation });
  };

  const handleRotateLeft = () => {
    if (!selectedElement) return;
    const currentRotation = selectedElement.rotation || 0;
    const newRotation = (currentRotation - 60 + 360) % 360;
    onUpdateElement(panel.id, selectedElement.id, { rotation: newRotation });
  };

  const handleDelete = () => {
    if (!selectedElement) return;
    onDeleteElement(panel.id, selectedElement.id);
    onSelectElement(null);
  };

  const handleMoveToFront = () => {
    if (!selectedElement) return;
    onMoveToFront(panel.id, selectedElement.id);
  };

  const handleMoveToBack = () => {
    if (!selectedElement) return;
    onMoveToBack(panel.id, selectedElement.id);
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-lg overflow-visible cursor-pointer transition-all ${
        isSelected ? 'ring-4 ring-blue-500 scale-[1.02]' : 'ring-2 ring-gray-300'
      }`}
      style={{
        width: '850px',
        height: '600px',
      }}
    >
      {/* Заголовок панели и инструменты */}
      <div className="absolute -top-14 left-0 right-0 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-t-lg flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold">{panel.title}</h3>
          {canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Удалить этот кадр?')) {
                  onDeletePanel(panel.id);
                }
              }}
              className="text-white hover:text-red-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Удалить кадр"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Панель инструментов для выбранного элемента */}
        {isSelected && selectedElement && (
          <div className="flex gap-2 items-center">
            <span className="text-white text-xs mr-2">Инструменты:</span>
            
            {/* Инструменты для частей тела */}
            {selectedElement.type === 'bodypart' && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScale(0.2);
                  }}
                  className="text-white hover:text-green-400 transition-colors p-1.5 bg-white/10 rounded"
                  title="Увеличить"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScale(-0.2);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors p-1.5 bg-white/10 rounded"
                  title="Уменьшить"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRotateLeft();
                  }}
                  className="text-white hover:text-purple-400 transition-colors p-1.5 bg-white/10 rounded"
                  title="Повернуть влево"
                >
                  <RotateCw className="w-4 h-4 scale-x-[-1]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRotate();
                  }}
                  className="text-white hover:text-purple-400 transition-colors p-1.5 bg-white/10 rounded"
                  title="Повернуть вправо"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowColorPicker(!showColorPicker);
                  }}
                  className="text-white hover:text-pink-400 transition-colors p-1.5 bg-white/10 rounded"
                  title="Цвета"
                >
                  <Palette className="w-4 h-4" />
                </button>
              </>
            )}
            
            {/* Управление слоями - для всех типов объектов */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMoveToFront();
              }}
              className="text-white hover:text-blue-400 transition-colors p-1.5 bg-white/10 rounded"
              title="На передний план"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMoveToBack();
              }}
              className="text-white hover:text-cyan-400 transition-colors p-1.5 bg-white/10 rounded"
              title="На задний план"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            
            {/* Кнопка удаления для всех элементов */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-white hover:text-red-400 transition-colors p-1.5 bg-white/10 rounded"
              title="Удалить"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-white hover:text-blue-400 transition-colors p-2 bg-white/10 rounded"
          title="Редактировать отдельно"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>

      {/* Палитра цветов */}
      {showColorPicker && selectedElement && selectedElement.type === 'bodypart' && (
        <div className="absolute top-20 right-4 bg-black/95 rounded-lg p-4 z-20 shadow-xl border border-white/30">
          <div className="text-white text-sm mb-3 font-bold">Изменить цвета:</div>
          <div className="flex flex-col gap-3">
            {/* Кожа - для всех частей тела */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm w-20">Кожа:</label>
              <input
                type="color"
                value={selectedElement.skinColor || '#FCD34D'}
                onChange={(e) => {
                  e.stopPropagation();
                  onUpdateElement(panel.id, selectedElement.id, { skinColor: e.target.value });
                }}
                className="w-16 h-8 rounded cursor-pointer"
              />
            </div>
            
            {/* Одежда - только для тела, рук и ног */}
            {selectedElement.bodyPartType !== 'head' && (
              <div className="flex items-center gap-3">
                <label className="text-white text-sm w-20">Одежда:</label>
                <input
                  type="color"
                  value={selectedElement.clothesColor || '#DC2626'}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdateElement(panel.id, selectedElement.id, { clothesColor: e.target.value });
                  }}
                  className="w-16 h-8 rounded cursor-pointer"
                />
              </div>
            )}
            
            {/* Волосы - только для головы (кроме супергероя) */}
            {selectedElement.bodyPartType === 'head' && selectedElement.characterType !== 'superhero' && (
              <div className="flex items-center gap-3">
                <label className="text-white text-sm w-20">Волосы:</label>
                <input
                  type="color"
                  value={selectedElement.hairColor || '#4B3621'}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdateElement(panel.id, selectedElement.id, { hairColor: e.target.value });
                  }}
                  className="w-16 h-8 rounded cursor-pointer"
                />
              </div>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(false);
              }}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 px-4 rounded"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Контейнер панели */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: panel.background,
        }}
      >
        {/* Элементы */}
        {panel.elements.map((element) => (
          <div key={element.id}>
            <EditableElement
              element={element}
              onUpdate={(updates) => onUpdateElement(panel.id, element.id, updates)}
              onDelete={() => onDeleteElement(panel.id, element.id)}
              isSelected={element.id === selectedElementId}
              onSelect={() => {
                onSelectElement(element.id);
                setShowColorPicker(false);
              }}
            />
          </div>
        ))}

        {/* Рамка комикса */}
        <div className="absolute inset-0 border-8 border-black pointer-events-none" />
      </div>
    </div>
  );
}