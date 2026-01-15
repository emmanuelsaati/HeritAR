# HeritAR - Augmented Reality Heritage Discovery App

HeritAR is a mobile application that allows users to discover, scan, and experience the history and heritage of Sierra Leone using Augmented Reality.

## Features

### Animated Portrait AR Experience
- Portrait (9:16) format heritage storytelling
- Hand-drawn aesthetic with gradual color transitions
- Animated cultural motifs, fabrics, landscapes, and landmarks
- Emotional text overlays like "Every face tells a story..."
- Designed to evoke cultural pride and emotion

### Core Features
- **Landmark Discovery**: Interactive map showing nearby heritage sites
- **AR Scan Experience**: Camera-based scanning with real-time recognition
- **Immersive Storytelling**: Visual AR scenes and historical narratives
- **Heritage Profiles**: Detailed pages with historical background and timeline
- **Offline Mode**: Ability to download heritage content for offline viewing

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation management
- **React Native Reanimated** - Smooth animations
- **Expo Camera** - Camera access for AR scanning
- **Expo Location** - GPS-based features

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

```
heritar/
├── src/
│   ├── data/
│   │   ├── heritageSites.ts      # Heritage site data
│   │   └── animatedPortraitData.ts # Animated portrait configurations
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Main landing screen
│   │   ├── AnimatedPortraitScreen.tsx # Animated portrait AR feature
│   │   ├── LandmarkDiscoveryScreen.tsx # Heritage discovery
│   │   ├── ARScanScreen.tsx      # Camera-based AR scanning
│   │   └── HeritageProfileScreen.tsx # Detailed heritage information
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── App.tsx                       # Main app component and navigation
├── package.json
├── tsconfig.json
└── README.md
```

## Animated Portrait Feature

The animated portrait feature provides an emotional, artistic representation of Sierra Leone's heritage through:

1. **Gradual Color Transitions**: Background colors shift smoothly between heritage-inspired palettes
2. **Animated Motifs**: Cultural symbols (leaves, roots, sun, birds) rotate and pulse
3. **Text Overlays**: Poetic messaging with hand-drawn border styling
4. **Portrait Format**: 9:16 aspect ratio optimized for social sharing

### Customization

Each heritage site can have its own animated portrait configuration in `src/data/animatedPortraitData.ts`:

```typescript
{
  siteId: '1',
  title: 'Every face tells a story...',
  subtitle: 'Every story keeps our heritage alive.',
  colors: ['#2D5A27', '#F4A460', '#8B4513', '#228B22', '#DEB887'],
  motifs: ['leaves', 'roots', 'sun', 'birds'],
  animationDuration: 8000,
}
```

## Heritage Sites

Currently includes:

1. **Cotton Tree** - Historic symbol of freedom for freed slaves
2. **Freetown Cotton Tree Memorial** - Commemorating the fallen landmark
3. **Sierra Leone National Museum** - Cultural artifact preservation
4. **King Jimmy Market** - Historic trading hub
5. **St. George's Cathedral** - Historic religious site

## Design Principles

- **Cultural Authenticity**: Colors and motifs inspired by Sierra Leone's heritage
- **Emotional Connection**: Animated portraits evoke pride and connection
- **Accessibility**: Clear navigation and readable text
- **Performance**: Smooth animations at minimum 30 FPS

## Future Roadmap

### Version 1.1
- Expanded heritage database
- Improved AR animations
- Audio narration

### Version 2.0
- Expert contributor dashboard
- Educational institution integrations
- Advanced storytelling formats

## Contributing

This project is part of Sierra Leone's digital heritage preservation initiative. For contributions, ensure:

- Historical accuracy through expert review
- Cultural sensitivity in representations
- Performance optimization for device compatibility

## License

Copyright © 2026 HeritAR Project. All rights reserved.
