import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>HeritAR</Text>
          <Text style={styles.subtitle}>Discover Sierra Leone's Heritage</Text>
        </View>

        <TouchableOpacity
          style={styles.animatedPortraitButton}
          onPress={() => navigation.navigate('AnimatedPortrait', { siteId: '1' })}
        >
          <View style={styles.animatedPortraitOverlay}>
            <Text style={styles.animatedPortraitTitle}>
              Experience Animated Heritage
            </Text>
            <Text style={styles.animatedPortraitSubtitle}>
              Watch stories come alive through art
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Explore Features</Text>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('LandmarkDiscovery')}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🗺️</Text>
            </View>
            <Text style={styles.featureTitle}>Landmark Discovery</Text>
            <Text style={styles.featureDescription}>
              Find nearby heritage sites on an interactive map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('ARScan', { siteId: '1' })}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📱</Text>
            </View>
            <Text style={styles.featureTitle}>AR Experience</Text>
            <Text style={styles.featureDescription}>
              Scan landmarks and unlock immersive stories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('HeritageProfile', { siteId: '1' })}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📜</Text>
            </View>
            <Text style={styles.featureTitle}>Heritage Profiles</Text>
            <Text style={styles.featureDescription}>
              Learn detailed history and cultural significance
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About HeritAR</Text>
          <Text style={styles.aboutText}>
            HeritAR is a mobile application that allows you to discover, scan, and
            experience the history and heritage of Sierra Leone using Augmented Reality.
            Point your camera at heritage landmarks to unlock immersive visual stories
            that bring the past into the present.
          </Text>
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
  header: {
    padding: 20,
    backgroundColor: '#2D5A27',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DEB887',
    textAlign: 'center',
  },
  animatedPortraitButton: {
    height: 400,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#2D5A27',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  animatedPortraitOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(45, 90, 39, 0.8)',
  },
  animatedPortraitTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  animatedPortraitSubtitle: {
    fontSize: 18,
    color: '#DEB887',
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D5A27',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});

export default HomeScreen;
