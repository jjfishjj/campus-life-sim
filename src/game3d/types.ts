export interface PlayerPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

export interface NPCData {
  id: string;
  name: string;
  type: 'static' | 'wandering';
  position: PlayerPosition;
  dialogue: DialogueLine[];
  location: string;
  color: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  avatar?: string;
}

export interface FakePlayer {
  id: string;
  name: string;
  position: PlayerPosition;
  targetPosition: PlayerPosition;
  color: string;
  speed: number;
}

export interface CampusBuilding {
  id: string;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  entranceOffset: [number, number, number];
}

export type GameScene = 'campus' | 'library_interior' | 'gym_interior' | 'classroom_interior';

export interface University {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export const universities: University[] = [
  { id: 'ntu', name: '國立台灣大學' },
  { id: 'nthu', name: '國立清華大學' },
  { id: 'nccu', name: '國立政治大學' },
  { id: 'nchu', name: '國立中興大學' },
  { id: 'ncku', name: '國立成功大學' },
];

export const departments: Department[] = [
  { id: 'cs', name: '資訊工程學系' },
  { id: 'foreign_lang', name: '外國語文學系' },
  { id: 'law', name: '法律學系' },
  { id: 'business', name: '企業管理學系' },
  { id: 'medicine', name: '醫學系' },
  { id: 'art', name: '藝術學系' },
];
