interface SuperheroProps {
  heroType: 'hero1' | 'hero2' | 'hero3';
  scale: number;
}

export function Superhero({ heroType, scale = 1 }: SuperheroProps) {
  const getHeroColors = () => {
    switch (heroType) {
      case 'hero1':
        return { suit: '#DC2626', cape: '#991B1B', skin: '#FCD34D' }; // Красный герой
      case 'hero2':
        return { suit: '#2563EB', cape: '#1E40AF', skin: '#FCA5A5' }; // Синий герой
      case 'hero3':
        return { suit: '#059669', cape: '#047857', skin: '#C084FC' }; // Зелёный герой
      default:
        return { suit: '#DC2626', cape: '#991B1B', skin: '#FCD34D' };
    }
  };

  const colors = getHeroColors();

  return (
    <div 
      className="relative select-none"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center bottom' }}
    >
      {/* Плащ */}
      <div 
        className="absolute -left-8 top-12 w-16 h-32 rounded-b-full"
        style={{ backgroundColor: colors.cape, clipPath: 'polygon(50% 0%, 0% 0%, 25% 100%)' }}
      />
      
      {/* Голова */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-12 rounded-full border-4 border-black"
        style={{ backgroundColor: colors.skin }}
      >
        {/* Маска */}
        <div 
          className="absolute top-3 left-0 right-0 h-4 rounded"
          style={{ backgroundColor: colors.suit }}
        />
        {/* Глаза */}
        <div className="absolute top-3 left-2 w-2 h-3 bg-white rounded-full" />
        <div className="absolute top-3 right-2 w-2 h-3 bg-white rounded-full" />
      </div>

      {/* Тело */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-14 w-16 h-24 rounded-lg border-4 border-black"
        style={{ backgroundColor: colors.suit }}
      >
        {/* Эмблема */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center">
          <span className="text-xl">⭐</span>
        </div>
      </div>

      {/* Левая рука */}
      <div 
        className="absolute left-0 top-16 w-5 h-20 rounded-full border-4 border-black origin-top"
        style={{ 
          backgroundColor: colors.suit,
          transform: 'rotate(-20deg)'
        }}
      >
        {/* Кисть */}
        <div 
          className="absolute -bottom-2 -left-1 w-6 h-6 rounded-full border-4 border-black"
          style={{ backgroundColor: colors.skin }}
        />
      </div>

      {/* Правая рука */}
      <div 
        className="absolute right-0 top-16 w-5 h-20 rounded-full border-4 border-black origin-top"
        style={{ 
          backgroundColor: colors.suit,
          transform: 'rotate(20deg)'
        }}
      >
        {/* Кисть */}
        <div 
          className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full border-4 border-black"
          style={{ backgroundColor: colors.skin }}
        />
      </div>

      {/* Левая нога */}
      <div 
        className="absolute left-3 top-36 w-6 h-24 rounded-lg border-4 border-black"
        style={{ backgroundColor: colors.suit }}
      >
        {/* Ботинок */}
        <div 
          className="absolute -bottom-2 -left-1 w-8 h-6 rounded-lg border-4 border-black"
          style={{ backgroundColor: '#1F2937' }}
        />
      </div>

      {/* Правая нога */}
      <div 
        className="absolute right-3 top-36 w-6 h-24 rounded-lg border-4 border-black"
        style={{ backgroundColor: colors.suit }}
      >
        {/* Ботинок */}
        <div 
          className="absolute -bottom-2 -right-1 w-8 h-6 rounded-lg border-4 border-black"
          style={{ backgroundColor: '#1F2937' }}
        />
      </div>
    </div>
  );
}
