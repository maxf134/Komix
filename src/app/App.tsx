import { useState } from 'react';
import { ComicPanel as ComicPanelComponent } from './components/ComicPanel';
import { PanelEditor } from './components/PanelEditor';
import { ComicPanel, ComicElement } from './types';

function App() {
  const [panels, setPanels] = useState<ComicPanel[]>([
    {
      id: '1',
      title: 'Кадр 1',
      background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)',
      elements: [],
    },
  ]);

  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const [editingPanelId, setEditingPanelId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const addPanel = () => {
    const newPanel: ComicPanel = {
      id: Date.now().toString(),
      title: `Кадр ${panels.length + 1}`,
      background: getRandomGradient(),
      elements: [],
    };
    setPanels([...panels, newPanel]);
  };

  const addElement = (type: 'bubble' | 'bodypart' | 'effect' | 'object', subType?: string, characterType?: string) => {
  // Используем editingPanelId если находимся в режиме редактирования
  const targetPanelId = editingPanelId || selectedPanelId;
  if (!targetPanelId) return;

  let newElement: ComicElement;

  console.log('Adding element - type:', type, 'subType:', subType, 'characterType:', characterType);

  // 👤 СОЗДАЕМ ЧАСТЬ ТЕЛА ПЕРСОНАЖА
  if (type === 'bodypart') {
    newElement = {
      id: Date.now().toString(),
      type: 'bodypart',
      content: '',
      x: 300,
      y: 250,
      bodyPartType: subType as BodyPartType || 'head',
      characterType: characterType as CharacterType || 'superhero',
      skinColor: '#FCD34D',
      clothesColor: characterType === 'superhero' ? '#DC2626' : '#2563EB',
      hairColor: '#4B3621',
      scale: 1,
      rotation: 0
    };
    console.log('✅ Created bodypart:', newElement);
  } 
  // 💬 СОЗДАЕМ ТЕКСТОВУЮ ПЛАШКУ
  else if (type === 'bubble') {
    newElement = {
      id: Date.now().toString(),
      type: 'bubble',
      content: 'Ваш текст здесь...',
      x: 300,
      y: 250,
      bubbleType: subType as BubbleType || 'speech',
      scale: 1,
      rotation: 0
    };
    console.log('✅ Created bubble:', newElement);
  } 
  // ⚡ СОЗДАЕМ ЭФФЕКТ
  else if (type === 'effect') {
    newElement = {
      id: Date.now().toString(),
      type: 'effect',
      effectType: subType as EffectType || 'lightning',
      x: 300,
      y: 250,
      width: 150,
      height: 150,
      scale: 1,
      rotation: 0,
      content: ''
    };
    console.log('✅ Created effect:', newElement);
  } 
  // 📦 ДРУГИЕ ОБЪЕКТЫ
  else {
    newElement = {
      id: Date.now().toString(),
      type: 'object',
      objectType: subType,
      x: 300,
      y: 250,
      scale: 1,
      rotation: 0,
      content: ''
    };
    console.log('✅ Created object:', newElement);
  }

  setPanels(panels.map(panel => 
    panel.id === targetPanelId
      ? { ...panel, elements: [...panel.elements, newElement] }
      : panel
  ));
};

  const updateElement = (panelId: string, elementId: string, updates: Partial<ComicElement>) => {
    setPanels(panels.map(panel =>
      panel.id === panelId
        ? {
            ...panel,
            elements: panel.elements.map(el =>
              el.id === elementId ? { ...el, ...updates } : el
            ),
          }
        : panel
    ));
  };

  const deleteElement = (panelId: string, elementId: string) => {
    setPanels(panels.map(panel =>
      panel.id === panelId
        ? {
            ...panel,
            elements: panel.elements.filter(el => el.id !== elementId),
          }
        : panel
    ));
  };

  const deletePanel = (panelId: string) => {
    // Не удаляем если это единственная панель
    if (panels.length <= 1) return;
    setPanels(panels.filter(panel => panel.id !== panelId));
    if (selectedPanelId === panelId) {
      setSelectedPanelId(null);
    }
  };

  const moveElementToFront = (panelId: string, elementId: string) => {
    setPanels(panels.map(panel => {
      if (panel.id !== panelId) return panel;
      
      const elementIndex = panel.elements.findIndex(el => el.id === elementId);
      if (elementIndex === -1 || elementIndex === panel.elements.length - 1) return panel;
      
      const newElements = [...panel.elements];
      const [element] = newElements.splice(elementIndex, 1);
      newElements.push(element);
      
      return { ...panel, elements: newElements };
    }));
  };

  const moveElementToBack = (panelId: string, elementId: string) => {
    setPanels(panels.map(panel => {
      if (panel.id !== panelId) return panel;
      
      const elementIndex = panel.elements.findIndex(el => el.id === elementId);
      if (elementIndex === -1 || elementIndex === 0) return panel;
      
      const newElements = [...panel.elements];
      const [element] = newElements.splice(elementIndex, 1);
      newElements.unshift(element);
      
      return { ...panel, elements: newElements };
    }));
  };

  const getRandomGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)',
      'linear-gradient(135deg, #FFB6C1 0%, #FFF0F5 100%)',
      'linear-gradient(135deg, #98FB98 0%, #F0FFF0 100%)',
      'linear-gradient(135deg, #DDA0DD 0%, #F8F0FF 100%)',
      'linear-gradient(135deg, #F0E68C 0%, #FFFACD 100%)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const editingPanel = panels.find(p => p.id === editingPanelId);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80)',
      }}
    >
      {/* Затемнение */}
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        {/* Заголовок */}
        <div className="text-center pt-8 pb-6">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Создай свой первый комикс
          </h1>
          <p className="text-white/90 text-lg"> ㅤ</p>
        </div>

        {/* Сетка панелей */}
        <div className="px-4 pb-12">
          <div className="flex flex-col gap-8 items-center">
            {panels.map((panel, index) => (
              <div key={panel.id} className="flex flex-col items-center gap-4">
                <ComicPanelComponent
                  panel={panel}
                  onUpdateElement={updateElement}
                  onDeleteElement={deleteElement}
                  onDeletePanel={deletePanel}
                  onMoveToFront={moveElementToFront}
                  onMoveToBack={moveElementToBack}
                  isSelected={selectedPanelId === panel.id}
                  onClick={() => {
                    setSelectedPanelId(panel.id);
                    setSelectedElementId(null);
                  }}
                  onEdit={() => setEditingPanelId(panel.id)}
                  selectedElementId={selectedPanelId === panel.id ? selectedElementId : null}
                  onSelectElement={(elementId) => {
                    setSelectedPanelId(panel.id);
                    setSelectedElementId(elementId);
                  }}
                  canDelete={panels.length > 1}
                />
                
                {/* Кнопка добавления нового кадра - только после последнего */}
                {index === panels.length - 1 && (
                  <button
                    onClick={addPanel}
                    className="w-16 h-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-all hover:scale-110"
                    title="Добавить новый кадр"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Редактор отдельной панели */}
      {editingPanel && (
  <PanelEditor
    panel={editingPanel}
    onUpdateElement={(elementId, updates) => updateElement(editingPanel.id, elementId, updates)}
    onDeleteElement={(elementId) => deleteElement(editingPanel.id, elementId)}
    onAddElement={(type, subType, characterType) => addElement(type, subType, characterType)}
    onMoveToFront={moveElementToFront}  // Добавляем
    onMoveToBack={moveElementToBack}    // Добавляем
    onClose={() => setEditingPanelId(null)}
  />
)}
    </div>
  );
}

export default App;