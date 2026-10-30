import { Plus, MessageCircle, Cloud, Volume2, Zap, Flame, Droplet, Skull } from 'lucide-react';

interface ControlPanelProps {
  onAddPanel: () => void;
  onAddElement: (type: 'bubble' | 'bodypart' | 'effect' | 'object', subType?: string, characterType?: string) => void;
  selectedPanelId: string | null;
}

export function ControlPanel({ onAddPanel, onAddElement, selectedPanelId }: ControlPanelProps) {
  const bodyParts = [
    { id: 'head', label: 'Голова', icon: '👤' },
    { id: 'body', label: 'Тело', icon: '👕' },
    { id: 'leftArm', label: 'Руки/Ноги', icon: '👖' },
  ];

  const characterTypes = [
    { id: 'superhero', label: 'Супергерой', color: 'bg-red-600 hover:bg-red-500' },
    { id: 'superhero2', label: 'Супергерой 2', color: 'bg-red-600 hover:bg-red-500' },
    { id: 'superhero3', label: 'Супергерой 3', color: 'bg-red-600 hover:bg-red-500' },
    { id: 'man', label: 'Мужчина', color: 'bg-blue-600 hover:bg-blue-500' },
    { id: 'man2', label: 'Мужчина 2', color: 'bg-blue-600 hover:bg-blue-500' },
    { id: 'woman', label: 'Женщина', color: 'bg-pink-600 hover:bg-pink-500' },
    { id: 'woman2', label: 'Женщина 2', color: 'bg-pink-600 hover:bg-pink-500' },
    { id: 'evil', label: 'Зло 1', color: 'bg-purple-600 hover:bg-purple-500' },
    { id: 'evil2', label: 'Зло 2', color: 'bg-purple-600 hover:bg-purple-500' },
    { id: 'evil3', label: 'Зло 3', color: 'bg-purple-600 hover:bg-purple-500' },
  ];

  // Эффекты для добавления
const effects = [
  { 
    id: 'lightning', 
    label: 'Молния', 
    icon: <Zap className="w-4 h-4" />, 
    effectColor: '#FFD700'
  },
  { 
    id: 'fire', 
    label: 'Огонь', 
    icon: <Flame className="w-4 h-4" />, 
    effectColor: '#FF4500'
  },
  { 
    id: 'water', 
    label: 'Вода', 
    icon: <Droplet className="w-4 h-4" />, 
    effectColor: '#1E90FF'
  },
  { 
    id: 'poison', 
    label: 'Яд', 
    icon: <Skull className="w-4 h-4" />, 
    effectColor: '#7CFC00'
  },
];

  // Функция для добавления эффекта
  const handleAddEffect = (effectId: string) => {
    onAddElement('effect', effectId);
  };
  
  return (
    <div className="h-full bg-black/90 backdrop-blur-md text-white shadow-2xl border-r-2 border-white/30 flex flex-col">
      
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Добавить панель - скрыть в режиме редактирования */}
        {!selectedPanelId && (
          <div className="mb-4">
            <button
              onClick={onAddPanel}
              className="w-full bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg px-4 py-3 flex items-center gap-2 font-bold"
            >
              <Plus className="w-5 h-5" />
              Выберите нужные элементы
            </button>
          </div>
        )}

        {/* Добавить элементы */}
        {selectedPanelId && (
          <div className="border-t border-white/30 pt-4 space-y-4">
            <p className="text-sm text-gray-300 mb-3 font-semibold">Нажмите на нужные элементы:</p>
            
            {/* Текстовые плашки */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Текстовые плашки:</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onAddElement('bubble', 'speech')}
                  className="bg-purple-600 hover:bg-purple-500 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Речь
                </button>
                <button
                  onClick={() => onAddElement('bubble', 'thought')}
                  className="bg-purple-600 hover:bg-purple-500 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
                >
                  <Cloud className="w-4 h-4" />
                  Мысль
                </button>
                <button
                  onClick={() => onAddElement('bubble', 'shout')}
                  className="bg-purple-600 hover:bg-purple-500 transition-colors rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  Крик
                </button>
              </div>
            </div>

            {/* Типы персонажей */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Персонажи:</p>
              <div className="flex flex-col gap-3">
                {characterTypes.map((char) => (
                  <div key={char.id}>
                    <div className={`${char.color} transition-colors rounded-lg px-3 py-2 text-sm font-bold text-center mb-2`}>
                      {char.label}
                    </div>
                    {/* Части тела для этого типа персонажа */}
                    <div className="grid grid-cols-2 gap-1.5 ml-1">
                      {bodyParts.map((part) => (
                        <button
                          key={`${char.id}-${part.id}`}
                          onClick={() => onAddElement('bodypart', part.id, char.id)}
                          className="bg-gray-700 hover:bg-gray-600 transition-colors rounded px-2 py-1.5 text-xs flex items-center gap-1 justify-center"
                        >
                          <span className="text-base">{part.icon}</span>
                          <span className="truncate text-[10px]">{part.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ⚡ СПЕЦЭФФЕКТЫ */}
            <div className="border-t border-white/30 pt-4 mt-6">
              <p className="text-xs text-gray-400 mb-3">⚡ Спецэффекты:</p>
              <div className="grid grid-cols-2 gap-2">
                {effects.map((effect) => {
  // Определяем цвета для каждого эффекта
  let bgColor = '';
  let hoverColor = '';
  switch(effect.id) {
    case 'lightning':
      bgColor = '#EAB308'; // yellow-500
      hoverColor = '#FBBF24'; // yellow-400
      break;
    case 'fire':
      bgColor = '#F97316'; // orange-500
      hoverColor = '#FB923C'; // orange-400
      break;
    case 'water':
      bgColor = '#2563EB'; // blue-600
      hoverColor = '#3B82F6'; // blue-500
      break;
    case 'poison':
      bgColor = '#16A34A'; // green-600
      hoverColor = '#22C55E'; // green-500
      break;
  }
  
  return (
    <button
      key={effect.id}
      onClick={() => handleAddEffect(effect.id)}
      className={`
        transition-all duration-200 
        rounded-lg px-3 py-3 
        flex flex-col items-center justify-center gap-1 text-sm
        shadow-lg hover:shadow-xl
        text-white font-medium
        hover:scale-105 active:scale-95
      `}
      style={{
        backgroundColor: bgColor,
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgColor}
    >
      {effect.icon}
      <span className="text-xs font-medium">{effect.label}</span>
    </button>
  );
})}
              </div>
              
              {/* Дополнительная информация */}
              <p className="text-[10px] text-gray-500 mt-2 text-center">
                Эффекты можно перемещать, масштабировать и поворачивать
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}