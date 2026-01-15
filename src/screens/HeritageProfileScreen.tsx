import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getHeritageSiteById } from '../data/heritageSites';
import { animatedPortraitData } from '../data/animatedPortraitData';

type HeritageProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HeritageProfile'
>;

interface Props {
  navigation: HeritageProfileScreenNavigationProp;
  route: { params: { siteId: string } };
}

const { width } = Dimensions.get('window');

const HeritageProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { siteId } = route.params;
  const site = getHeritageSiteById(siteId);
  const hasPortrait = animatedPortraitData[siteId] !== undefined;

  if (!site) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Heritage site not found</Text>
      </View>
    );
  }

  const renderTimeline = () => (
    <View style={styles.timelineContainer}>
      <Text style={styles.sectionTitle}>Historical Timeline</Text>
      {site.timeline.map((event, index) => (
        <View key={index} style={styles.timelineItem}>
          <View style={styles.timelineYearContainer}>
            <Text style={styles.timelineYear}>{event.year}</Text>
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineEvent}>{event.event}</Text>
          </View>
        </View>
      ))}
    </View>
  );

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>{getCategoryIcon(site.category)}</Text>
            </View>
            <Text style={styles.siteName}>{site.name}</Text>
            <Text style={styles.categoryText}>
              {site.category.replace('_', ' ').toUpperCase()}
            </Text>
            {site.arAvailable && (
              <TouchableOpacity
                style={styles.arButton}
                onPress={() => navigation.navigate('ARScan', { siteId })}
              >
                <Text style={styles.arButtonText}>📱 Experience AR</Text>
              </TouchableOpacity>
            )}
            {hasPortrait && (
              <TouchableOpacity
                style={styles.portraitButton}
                onPress={() => navigation.navigate('AnimatedPortrait', { siteId })}
              >
                <Text style={styles.portraitButtonText}>🎨 View Animated Portrait</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{site.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>📍 {site.location.address}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historical Background</Text>
            <Text style={styles.contentText}>{site.historicalBackground}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Significance</Text>
            <Text style={styles.contentText}>{site.culturalSignificance}</Text>
          </View>

          {renderTimeline()}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Images</Text>
            <View style={styles.imageGrid}>
              {site.images.map((image, index) => (
                <View key={index} style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>🖼️</Text>
                  <Text style={styles.imageName}>{image}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
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
  headerContainer: {
    backgroundColor: '#2D5A27',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
  },
  categoryBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 40,
  },
  siteName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#DEB887',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  arButton: {
    backgroundColor: '#DEB887',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  arButtonText: {
    fontSize: 14,
    color: '#2D5A27',
    fontWeight: 'bold',
  },
  portraitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  portraitButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  timelineContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineYearContainer: {
    width: 70,
    marginRight: 12,
  },
  timelineYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D5A27',
    textAlign: 'right',
  },
  timelineContent: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#DEB887',
    paddingLeft: 12,
    paddingBottom: 8,
  },
  timelineEvent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  imagePlaceholder: {
    width: (width - 76) / 2,
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default HeritageProfileScreen;
