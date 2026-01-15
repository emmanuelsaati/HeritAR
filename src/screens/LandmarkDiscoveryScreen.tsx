import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { heritageSites, getHeritageSiteById } from '../data/heritageSites';

type LandmarkDiscoveryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LandmarkDiscovery'
>;

interface Props {
  navigation: LandmarkDiscoveryScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const LandmarkDiscoveryScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Sites' },
    { id: 'monument', name: 'Monuments' },
    { id: 'museum', name: 'Museums' },
    { id: 'natural_heritage', name: 'Natural Heritage' },
    { id: 'building', name: 'Historic Buildings' },
  ];

  const filteredSites =
    selectedCategory === 'all'
      ? heritageSites
      : heritageSites.filter((site) => site.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'monument':
        return '🏛️';
      case 'museum':
        return '🏛️';
      case 'natural_heritage':
        return '🌳';
      case 'building':
        return '🏛️';
      default:
        return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monument':
        return '#8B4513';
      case 'museum':
        return '#8B0000';
      case 'natural_heritage':
        return '#228B22';
      case 'building':
        return '#4A4A4A';
      default:
        return '#2D5A27';
    }
  };

  const renderCategoryButton = (category: { id: string; name: string }) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && styles.categoryButtonTextActive,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSite = ({ item }: { item: typeof heritageSites[0] }) => (
    <TouchableOpacity
      style={styles.siteCard}
      onPress={() => navigation.navigate('HeritageProfile', { siteId: item.id })}
    >
      <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(item.category) }]}>
        <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
      </View>
      <View style={styles.siteInfo}>
        <Text style={styles.siteName}>{item.name}</Text>
        <Text style={styles.siteAddress}>{item.location.address}</Text>
        <View style={styles.siteMeta}>
          <Text style={styles.metaText}>{item.description}</Text>
        </View>
        {item.arAvailable && (
          <View style={styles.arBadge}>
            <Text style={styles.arBadgeText}>AR Available</Text>
          </View>
        )}
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>🗺️</Text>
        <Text style={styles.mapPlaceholderTitle}>Heritage Map</Text>
        <Text style={styles.mapPlaceholderSubtitle}>
          Interactive map coming soon
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => renderCategoryButton(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          {filteredSites.length} Heritage {filteredSites.length === 1 ? 'Site' : 'Sites'}
        </Text>
        <FlatList
          data={filteredSites}
          renderItem={renderSite}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.siteList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#2D5A27',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
  },
  mapPlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapPlaceholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mapPlaceholderSubtitle: {
    fontSize: 14,
    color: '#DEB887',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryList: {
    paddingRight: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2D5A27',
  },
  categoryButtonActive: {
    backgroundColor: '#2D5A27',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#2D5A27',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
  },
  siteList: {
    paddingBottom: 20,
  },
  siteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  siteInfo: {
    flex: 1,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 4,
  },
  siteAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  siteMeta: {
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  arBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D5A27',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  arBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#2D5A27',
  },
});

export default LandmarkDiscoveryScreen;
