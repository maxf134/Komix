import { useState } from 'react';

interface SpeechBubbleProps {
  content: string;
  bubbleType: 'speech' | 'thought' | 'shout';
  onUpdate: (content: string) => void;
}

export function SpeechBubble({ content, bubbleType, onUpdate }: SpeechBubbleProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getBubbleStyle = () => {
    const baseStyle = "relative bg-white rounded-2xl px-4 py-3 text-black font-bold shadow-lg border-4 border-black min-w-[120px] max-w-[200px]";
    
    switch (bubbleType) {
      case 'thought':
        return baseStyle + " rounded-full";
      case 'shout':
        return baseStyle + " border-8";
      default:
        return baseStyle;
    }
  };

  const renderTail = () => {
    if (bubbleType === 'thought') {
      return (
        <>
          <div className="absolute -bottom-6 left-8 w-4 h-4 bg-white rounded-full border-4 border-black" />
          <div className="absolute -bottom-10 left-4 w-3 h-3 bg-white rounded-full border-4 border-black" />
        </>
      );
    }
    
    return (
      <svg
        className="absolute -bottom-4 left-6"
        width="30"
        height="20"
        viewBox="0 0 30 20"
      >
        <path
          d="M 0 0 Q 10 10, 15 20 L 0 10 Z"
          fill="white"
          stroke="black"
          strokeWidth="4"
        />
      </svg>
    );
  };

  return (
    <div className="relative">
      <div className={getBubbleStyle()}>
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => onUpdate(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-full bg-transparent border-none outline-none resize-none font-bold"
            rows={2}
          />
        ) : (
          <div
            onDoubleClick={() => setIsEditing(true)}
            className="cursor-text whitespace-pre-wrap break-words"
          >
            {content || 'Кликните дважды'}
          </div>
        )}
      </div>
      {bubbleType !== 'shout' && renderTail()}
    </div>
  );
}
