export type CategoryId = 
  | 'todos'
  | 'nail-art'
  | 'unas-esculpidas'
  | 'manicure-ruso'
  | 'pedicure-autor'
  | 'pestanas-cejas'
  | 'minimalismo';

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel?: string;
  tagline: string;
  count?: number;
}

export type CollectionId = 
  | 'nude-essence'
  | 'golden-hour'
  | 'high-editorial'
  | 'soft-minimalism';

export interface Collection {
  id: CollectionId;
  num: string;
  title: string;
  subtitle: string;
  statement: string;
  coverImage: string;
  colorTone: string;
  tags: string[];
}

export type MediaFormat = 'tall' | 'portrait' | 'square' | 'wide' | 'panoramic';

export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  categoryLabel: string;
  collection: CollectionId;
  collectionLabel: string;
  image: string;
  detailImage?: string;
  format: MediaFormat;
  aspectRatio: string;
  technique: string;
  finish: string;
  shape?: string;
  palette: string[];
  description: string;
  featured?: boolean;
  editorialQuote?: string;
}

export type LayoutMode = 'editorial' | 'magazine' | 'minimal';
