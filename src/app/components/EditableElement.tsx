import { useState, useRef, useEffect } from 'react';
import { ComicElement } from '../types';
import { SpeechBubble } from './SpeechBubble';
import { BodyPart } from './BodyPart';
import { EffectElement } from './EffectElement';

interface EditableElementProps {
  element: ComicElement;
  onUpdate: (updates: Partial<ComicElement>) => void;
  onDelete: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function EditableElement({ 
  element, 
  onUpdate, 
  onDelete, 
  isSelected = false, 
  onSelect 
}: EditableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
    if (onSelect) {
      onSelect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setHasMoved(true);
    onUpdate({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging && !hasMoved && onSelect) {
      onSelect();
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  const renderElement = () => {
    switch (element.type) {
      case 'bubble':
        return (
          <SpeechBubble
            content={element.content}
            bubbleType={element.bubbleType || 'speech'}
            onUpdate={(content) => onUpdate({ content })}
          />
        );
      case 'bodypart':
        return (
          <BodyPart
            bodyPartType={element.bodyPartType || 'head'}
            characterType={element.characterType || 'superhero'}
            skinColor={element.skinColor || '#FCD34D'}
            clothesColor={element.clothesColor || '#DC2626'}
            hairColor={element.hairColor || '#4B3621'}
            scale={element.scale || 1}
            rotation={element.rotation || 0}
          />
        );
      case 'effect':
        return (
          <EffectElement
            element={element}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        );
      default:
        return (
          <div className="text-4xl cursor-move select-none">
            ⭐
          </div>
        );
    }
  };

  // Определяем transform в зависимости от типа элемента
  const getTransform = () => {
    if (element.type === 'bodypart') {
      // Для персонажей - только scale (поворот внутри BodyPart)
      return `scale(${element.scale || 1})`;
    } else if (element.type === 'effect') {
      // Для эффектов - никакой трансформации, всё внутри EffectElement
      return 'none';
    } else {
      // Для остальных (bubble и т.д.)
      return `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`;
    }
  };

  return (
    <div
      className="absolute"  // Убрали класс с обводкой
      style={{
        left: element.x,
        top: element.y,
        zIndex: isDragging ? 1000 : isSelected ? 100 : element.zIndex || 1,
        transform: getTransform(),
        transformOrigin: 'center center',
        WebkitTransformOrigin: 'center center',
        MozTransformOrigin: 'center center',
        ...element.style,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {renderElement()}
    </div>
  );
}