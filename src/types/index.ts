export type Category = 'academico' | 'recreativo' | 'social' | 'deportivo';

export interface MapPosition {
  x: number;
  y: number;
}

export interface Zone {
  id: string;
  name: string;
  category: Category;
  description: string;
  images: string[];
  videos?: string[];
  audio: string;
  audioDescription: string;
  mapPosition: MapPosition;
  panoScene: string;
  hideGallery?: boolean;
  tourBaseUrl?: string;
}

export const categoryLabels: Record<Category, string> = {
  academico: 'Académico',
  recreativo: 'Recreativo',
  social: 'Social',
  deportivo: 'Deportivo',
};

export const categoryColors: Record<Category, string> = {
  academico: '#FF051E',
  recreativo: '#2E7D32',
  social: '#F57C00',
  deportivo: '#1565C0',
};
