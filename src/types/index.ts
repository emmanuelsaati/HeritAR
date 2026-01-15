export interface HeritageSite {
  id: string;
  name: string;
  category: 'monument' | 'museum' | 'natural_heritage' | 'building';
  description: string;
  historicalBackground: string;
  culturalSignificance: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  timeline: TimelineEvent[];
  images: string[];
  arAvailable: boolean;
}

export interface TimelineEvent {
  year: string;
  event: string;
}

export interface AnimatedPortraitData {
  siteId: string;
  title: string;
  subtitle: string;
  colors: string[];
  motifs: string[];
  animationDuration: number;
}
