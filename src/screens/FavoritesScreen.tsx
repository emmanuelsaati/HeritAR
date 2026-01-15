import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useApp } from '../context/AppContext';
import { heritageSites } from '../data/heritageSites';

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

interface Props {
  navigation: FavoritesScreenNavigationProp;
}

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favorites, removeFavorite } = useApp();

  const favoriteSites = heritageSites.filter((site) =>
    favorites.includes(site.id)
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>
            {favoriteSites.length} saved {favoriteSites.length === 1 ? 'site' : 'sites'}
          </Text>
        </View>

        {favoriteSites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Start exploring heritage sites and tap the heart icon to save your
              favorites here.
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('LandmarkDiscovery')}
            >
              <Text style={styles.exploreButtonText}>Explore Sites</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sitesContainer}>
            {favoriteSites.map((site) => (
              <View key={site.id} style={styles.siteCard}>
                <TouchableOpacity
                  style={styles.siteContent}
                  onPress={() =>
                    navigation.navigate('HeritageProfile', { siteId: site.id })
                  }
                >
                  <View style={styles.siteIcon}>
                    <Text style={styles.siteIconText}>
                      {site.category === 'monument' && '🗿'}
                      {site.category === 'museum' && '🏛️'}
                      {site.category === 'natural_heritage' && '🌳'}
                      {site.category === 'building' && '🏛️'}
                    </Text>
                  </View>
                  <View style={styles.siteInfo}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Text style={styles.siteDescription} numberOfLines={2}>
                      {site.description}
                    </Text>
                    <Text style={styles.siteCategory}>
                      {site.category.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFavorite(site.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#2D5A27',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DEB887',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#2D5A27',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sitesContainer: {
    padding: 20,
  },
  siteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  siteContent: {
    flexDirection: 'row',
    padding: 16,
  },
  siteIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D5A27',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  siteIconText: {
    fontSize: 28,
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
  siteDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  siteCategory: {
    fontSize: 12,
    color: '#DEB887',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#F5F5DC',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  removeButtonText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
