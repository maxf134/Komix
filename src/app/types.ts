// types.ts

// Типы для текстовых плашек
export type BubbleType = 'speech' | 'thought' | 'shout';

// Типы для частей тела
export type BodyPartType = 'head' | 'body' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg';

// Типы для персонажей
export type CharacterType = 
  | 'superhero' 
  | 'man' 
  | 'man2' 
  | 'woman' 
  | 'woman2' 
  | 'boy' 
  | 'girl' 
  | 'evil' 
  | 'evil2' 
  | 'evil3';

// Типы для спецэффектов
export type EffectType = 'lightning' | 'fire' | 'water' | 'poison';

// Интерфейс для текстовой плашки
export interface BubbleElement {
  id: string;
  type: 'bubble';
  bubbleType: BubbleType;
  content: string;
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

// Интерфейс для части тела персонажа
export interface BodyPartElement {
  id: string;
  type: 'bodypart';
  bodyPartType: BodyPartType;
  characterType: CharacterType;
  skinColor: string;
  clothesColor: string;
  hairColor: string;
  scale: number;
  rotation: number;
  x: number;
  y: number;
  content?: string;
  style?: React.CSSProperties;
}

// Интерфейс для спецэффекта
export interface EffectElement {
  id: string;
  type: 'effect';
  effectType: EffectType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  scale?: number;
  rotation?: number;
  color?: string;
  secondaryColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  content?: string;
  style?: React.CSSProperties;
}

// Интерфейс для других объектов (можно расширить позже)
export interface ObjectElement {
  id: string;
  type: 'object';
  objectType?: string;
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  content?: string;
  style?: React.CSSProperties;
}

// Общий тип для всех элементов
export type ComicElement = BubbleElement | BodyPartElement | EffectElement | ObjectElement;

// Интерфейс для панели комикса
export interface ComicPanel {
  id: string;
  title: string;
  background: string;
  elements: ComicElement[];
}