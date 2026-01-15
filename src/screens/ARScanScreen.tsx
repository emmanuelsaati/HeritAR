import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getHeritageSiteById } from '../data/heritageSites';

type ARScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ARScan'>;

interface Props {
  navigation: ARScanScreenNavigationProp;
  route: { params: { siteId: string } };
}

const { width, height } = Dimensions.get('window');

const ARScanScreen: React.FC<Props> = ({ route, navigation }) => {
  const { siteId } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const pulseAnim = new Animated.Value(0);

  const site = getHeritageSiteById(siteId);

  useEffect(() => {
    if (site?.arAvailable) {
      startScanAnimation();
      startPulseAnimation();
    }
  }, [site]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startScanAnimation = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowOverlay(true);
          setIsScanning(false);
          Alert.alert(
            'Landmark Recognized!',
            `${site?.name} has been successfully scanned.`,
            [
              {
                text: 'View Heritage Profile',
                onPress: () => navigation.navigate('HeritageProfile', { siteId }),
              },
              {
                text: 'Close',
                style: 'cancel',
              },
            ]
          );
        }, 500);
      }
    }, 300);

    return () => clearInterval(interval);
  };

  const handleRetakePhoto = () => {
    setScanProgress(0);
    setIsScanning(true);
    setShowOverlay(false);
    startScanAnimation();
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Camera permission is required to use AR scanning
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" />

      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.topBarText}>AR Scan</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.scanArea}>
          <Animated.View
            style={[
              styles.scanFrame,
              {
                opacity: Animated.subtract(1, pulseAnim),
                transform: [{ scale: Animated.add(1, Animated.multiply(pulseAnim, 0.2)) }],
              },
            ]}
          >
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </AnimatedView>

          {isScanning && (
            <View style={styles.scanLineContainer}>
              <View
                style={[
                  styles.scanLine,
                  {
                    top: `${(scanProgress / 100) * 80}%`,
                  },
                ]}
              />
            </View>
          )}

          <View style={styles.scanInfo}>
            <Text style={styles.scanTitle}>
              {site?.name || 'Heritage Site'}
            </Text>
            {isScanning ? (
              <Text style={styles.scanStatus}>Scanning... {scanProgress}%</Text>
            ) : (
              <Text style={styles.scanStatusComplete}>Scan Complete!</Text>
            )}
          </View>
        </View>

        <View style={styles.bottomBar}>
          {showOverlay && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleRetakePhoto}
              >
                <Text style={styles.secondaryButtonText}>Rescan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('HeritageProfile', { siteId })}
              >
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showOverlay && (
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>
                Point your camera at the landmark
              </Text>
              <Text style={styles.instructionSubtext}>
                Hold steady for best results
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#DEB887',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopRightRadius: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLineContainer: {
    ...StyleSheet.absoluteFillObject,
    width: 280,
    height: 280,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#DEB887',
    shadowColor: '#DEB887',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  scanInfo: {
    marginTop: 40,
    alignItems: 'center',
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  scanStatus: {
    fontSize: 16,
    color: '#DEB887',
    fontWeight: '600',
  },
  scanStatusComplete: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  bottomBar: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  instructions: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionSubtext: {
    fontSize: 14,
    color: '#DEB887',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2D5A27',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  permissionButton: {
    marginTop: 20,
    backgroundColor: '#2D5A27',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ARScanScreen;
