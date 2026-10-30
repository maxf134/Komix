// src/components/EffectElement.tsx
import React, { useRef, useEffect, useState } from 'react';
import { LightningEffect, FireEffect, WaterEffect, PoisonEffect } from './SpecialEffects';

interface EffectElementProps {
  element: any;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

export const EffectElement: React.FC<EffectElementProps> = ({
  element,
  onUpdate,
  onDelete,
  isSelected,
  onSelect
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getEffectComponent = () => {
    const props = {
      width: element.width || 150,
      height: element.height || 150,
      className: isSelected ? 'selected' : ''
    };

    switch(element.effectType) {
      case 'lightning':
        return <LightningEffect {...props} />;
      case 'fire':
        return <FireEffect {...props} />;
      case 'water':
        return <WaterEffect {...props} />;
      case 'poison':
        return <PoisonEffect {...props} />;
      default:
        return (
          <div style={{ 
            width: props.width, 
            height: props.height, 
            background: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            ? {element.effectType}
          </div>
        );
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y
    });
    
    onSelect();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(850 - (element.width || 150), e.clientX - dragStart.x));
    const newY = Math.max(0, Math.min(600 - (element.height || 150), e.clientY - dragStart.y));
    
    onUpdate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const getGlowColor = () => {
    switch(element.effectType) {
      case 'lightning': return '#FFD700';
      case 'fire': return '#FF4500';
      case 'water': return '#1E90FF';
      case 'poison': return '#7CFC00';
      default: return '#FFFFFF';
    }
  };

  const width = element.width || 150;
  const height = element.height || 150;
  const rotation = element.rotation || 0;

  return (
    <div
      ref={elementRef}
      className="absolute cursor-move select-none"
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: width,
        height: height,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${element.scale || 1})`,
        transformOrigin: 'center center',
        WebkitTransformOrigin: 'center center',
        MozTransformOrigin: 'center center',
        zIndex: isDragging ? 1000 : isSelected ? 100 : element.zIndex || 1,
        filter: isSelected ? `drop-shadow(0 0 15px ${getGlowColor()})` : 'none',
        transition: 'filter 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Контейнер для центрирования содержимого */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getEffectComponent()}
      </div>
    </div>
  );
};