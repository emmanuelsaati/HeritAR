import { HeritageSite } from '../types';

export const heritageSites: HeritageSite[] = [
  {
    id: '1',
    name: 'Cotton Tree',
    category: 'natural_heritage',
    description: 'The historic Cotton Tree in Freetown, a symbol of freedom for freed slaves',
    historicalBackground: 'The Cotton Tree has stood in Freetown for over 200 years. It was the meeting point for freed slaves when they arrived in Freetown in 1792. Under this tree, they prayed and gave thanks for their freedom, establishing it as a powerful symbol of liberty and new beginnings.',
    culturalSignificance: 'The Cotton Tree represents freedom, resilience, and the beginning of a new nation. It is featured on Sierra Leone\'s coat of arms and remains a central landmark in Freetown\'s identity.',
    location: {
      latitude: 8.4886,
      longitude: -13.2326,
      address: 'Central Freetown, Sierra Leone',
    },
    timeline: [
      { year: '1792', event: 'Freed slaves gather under the tree to pray and give thanks' },
      { year: '1800s', event: 'Becomes central landmark for the growing settlement' },
      { year: '1896', event: 'Photographed and documented by colonial administrators' },
      { year: '2023', event: 'Tree falls after severe storm; remains preserved as memorial' },
    ],
    images: ['cotton-tree-1.jpg', 'cotton-tree-2.jpg'],
    arAvailable: true,
  },
  {
    id: '2',
    name: 'Freetown Cotton Tree Memorial',
    category: 'monument',
    description: 'Memorial site commemorating the historic Cotton Tree',
    historicalBackground: 'Following the fall of the Cotton Tree in May 2023, the memorial site was established to preserve the memory and significance of this national symbol. The tree had witnessed centuries of Sierra Leone\'s history.',
    culturalSignificance: 'The memorial continues the Cotton Tree\'s legacy as a symbol of freedom and national identity. It serves as a gathering place for reflection on Sierra Leone\'s journey as a nation.',
    location: {
      latitude: 8.4886,
      longitude: -13.2326,
      address: 'Central Freetown, Sierra Leone',
    },
    timeline: [
      { year: '2023', event: 'Cotton Tree falls during storm' },
      { year: '2023', event: 'Memorial site established' },
      { year: '2024', event: 'AR experience launched to recreate the tree in augmented reality' },
    ],
    images: ['cotton-tree-memorial-1.jpg'],
    arAvailable: true,
  },
  {
    id: '3',
    name: 'Sierra Leone National Museum',
    category: 'museum',
    description: 'The national museum preserving Sierra Leone\'s cultural heritage',
    historicalBackground: 'Established in 1957, the National Museum houses a rich collection of artifacts representing Sierra Leone\'s diverse ethnic groups and colonial history. Located in Freetown, it serves as the primary institution for cultural preservation.',
    culturalSignificance: 'The museum is the custodian of Sierra Leone\'s cultural artifacts, including traditional masks, musical instruments, historical documents, and pre-historic tools. It plays a crucial role in educating visitors about the nation\'s heritage.',
    location: {
      latitude: 8.4896,
      longitude: -13.2316,
      address: 'Siaka Stevens Street, Freetown, Sierra Leone',
    },
    timeline: [
      { year: '1957', event: 'National Museum established' },
      { year: '1970s', event: 'Collection expanded with ethnographic materials' },
      { year: '1990s', event: 'Civil war causes temporary closure' },
      { year: '2000s', event: 'Museum reopens with restored collections' },
    ],
    images: ['museum-1.jpg', 'museum-2.jpg'],
    arAvailable: true,
  },
  {
    id: '4',
    name: 'King Jimmy Market',
    category: 'building',
    description: 'Historic market building in the heart of Freetown',
    historicalBackground: 'King Jimmy Market is one of Freetown\'s oldest trading hubs, named after King Jimmy, a Temne chief. The market has served as a center of commerce for generations, connecting traders from across the region.',
    culturalSignificance: 'The market represents the commercial spirit and trading heritage of Freetown. It has been a gathering place for diverse ethnic groups, fostering cultural exchange and economic activity.',
    location: {
      latitude: 8.4870,
      longitude: -13.2300,
      address: 'Freetown, Sierra Leone',
    },
    timeline: [
      { year: '1800s', event: 'Market established as trading post' },
      { year: '1900s', event: 'Building constructed with colonial architecture' },
      { year: '2010s', event: 'Renovation to preserve historic structure' },
    ],
    images: ['king-jimmy-1.jpg'],
    arAvailable: false,
  },
  {
    id: '5',
    name: 'St. George\'s Cathedral',
    category: 'building',
    description: 'Historic Anglican cathedral in Freetown',
    historicalBackground: 'Built in 1818, St. George\'s Cathedral is one of the oldest churches in Freetown. The cathedral has played a significant role in the religious and social life of the city for over two centuries.',
    culturalSignificance: 'The cathedral represents the religious diversity and architectural heritage of Freetown. It has been a center for community gatherings and important national events.',
    location: {
      latitude: 8.4850,
      longitude: -13.2340,
      address: 'Freetown, Sierra Leone',
    },
    timeline: [
      { year: '1818', event: 'Cathedral construction completed' },
      { year: '1820s', event: 'Becomes center for Anglican worship' },
      { year: '1900s', event: 'Major renovations and additions' },
    ],
    images: ['st-georges-1.jpg'],
    arAvailable: false,
  },
];

export const getHeritageSiteById = (id: string): HeritageSite | undefined => {
  return heritageSites.find((site) => site.id === id);
};
