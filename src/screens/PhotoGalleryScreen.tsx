import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { getHeritageSiteById } from '../data/heritageSites';

type PhotoGalleryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PhotoGallery'
>;

type PhotoGalleryScreenRouteProp = RouteProp<RootStackParamList, 'PhotoGallery'>;

interface Props {
  navigation: PhotoGalleryScreenNavigationProp;
  route: PhotoGalleryScreenRouteProp;
}

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 2;

const PhotoGalleryScreen: React.FC<Props> = ({ route }) => {
  const { siteId } = route.params;
  const site = getHeritageSiteById(siteId);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!site) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Site not found</Text>
      </View>
    );
  }

  const placeholderImages = [
    { id: '1', title: 'Historic View', description: 'View from the 1800s' },
    { id: '2', title: 'Modern Day', description: 'Present day photograph' },
    { id: '3', title: 'Architectural Detail', description: 'Close-up details' },
    { id: '4', title: 'Surrounding Area', description: 'Context and surroundings' },
    { id: '5', title: 'Cultural Event', description: 'Community gathering' },
    { id: '6', title: 'Restoration', description: 'Preservation efforts' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{site.name}</Text>
          <Text style={styles.subtitle}>Photo Gallery</Text>
          <Text style={styles.imageCount}>
            {placeholderImages.length} {placeholderImages.length === 1 ? 'Photo' : 'Photos'}
          </Text>
        </View>

        <View style={styles.galleryGrid}>
          {placeholderImages.map((image, index) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageCard}
              onPress={() => setSelectedImageIndex(index)}
            >
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderIcon}>
                  {site.category === 'monument' && '🗿'}
                  {site.category === 'museum' && '🏛️'}
                  {site.category === 'natural_heritage' && '🌳'}
                  {site.category === 'building' && '🏛️'}
                </Text>
              </View>
              <View style={styles.imageInfo}>
                <Text style={styles.imageTitle} numberOfLines={1}>
                  {image.title}
                </Text>
                <Text style={styles.imageDescription} numberOfLines={1}>
                  {image.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoIcon}>📸</Text>
          <Text style={styles.infoTitle}>Community Photos Coming Soon</Text>
          <Text style={styles.infoText}>
            We're working on a feature that will allow community members to
            contribute their own photos of heritage sites. Stay tuned!
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={selectedImageIndex !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImageIndex(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSelectedImageIndex(null)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalImagePlaceholder}>
                <Text style={styles.modalImageIcon}>
                  {site.category === 'monument' && '🗿'}
                  {site.category === 'museum' && '🏛️'}
                  {site.category === 'natural_heritage' && '🌳'}
                  {site.category === 'building' && '🏛️'}
                </Text>
              </View>
              {selectedImageIndex !== null && (
                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitle}>
                    {placeholderImages[selectedImageIndex].title}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {placeholderImages[selectedImageIndex].description}
                  </Text>
                  <Text style={styles.modalCounter}>
                    {selectedImageIndex + 1} / {placeholderImages.length}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImageIndex(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
    padding: 20,
    backgroundColor: '#2D5A27',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#DEB887',
    marginBottom: 8,
  },
  imageCount: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  imageCard: {
    width: imageSize,
    margin: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: imageSize,
    backgroundColor: '#2D5A27',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 48,
  },
  imageInfo: {
    padding: 12,
  },
  imageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 4,
  },
  imageDescription: {
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#FFF9E6',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DEB887',
  },
  infoIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalImagePlaceholder: {
    width: width - 40,
    height: width - 40,
    backgroundColor: '#2D5A27',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImageIcon: {
    fontSize: 80,
  },
  modalInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  modalCounter: {
    fontSize: 14,
    color: '#DEB887',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2D5A27',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhotoGalleryScreen;
