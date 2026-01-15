import { AnimatedPortraitData } from '../types';

export const animatedPortraitData: Record<string, AnimatedPortraitData> = {
  '1': {
    siteId: '1',
    title: 'Every face tells a story...',
    subtitle: 'Every story keeps our heritage alive.',
    colors: ['#2D5A27', '#F4A460', '#8B4513', '#228B22', '#DEB887'],
    motifs: ['leaves', 'roots', 'sun', 'birds'],
    animationDuration: 8000,
  },
  '2': {
    siteId: '2',
    title: 'Rooted in freedom...',
    subtitle: 'Standing tall through centuries of change.',
    colors: ['#2D5A27', '#CD853F', '#556B2F', '#BDB76B', '#8B4513'],
    motifs: ['roots', 'branches', 'leaves', 'doves'],
    animationDuration: 10000,
  },
  '3': {
    siteId: '3',
    title: 'Preserving our treasures...',
    subtitle: 'Each artifact holds a memory of our ancestors.',
    colors: ['#8B0000', '#FFD700', '#4A4A4A', '#DEB887', '#800020'],
    motifs: ['masks', 'tools', 'fabrics', 'drums'],
    animationDuration: 9000,
  },
};
