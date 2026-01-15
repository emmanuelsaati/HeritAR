import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { animatedPortraitData } from '../data/animatedPortraitData';

type AnimatedPortraitScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimatedPortrait'
>;

interface Props {
  navigation: AnimatedPortraitScreenNavigationProp;
  route: { params: { siteId: string } };
}

const { width, height } = Dimensions.get('window');

const AnimatedPortraitScreen: React.FC<Props> = ({ route }) => {
  const { siteId } = route.params;
  const portraitData = animatedPortraitData[siteId];

  const colorIndex = useSharedValue(0);
  const motifOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  const rotationValue = useSharedValue(0);

  useEffect(() => {
    if (!portraitData) return;

    const animateColors = () => {
      colorIndex.value = withRepeat(
        withTiming(portraitData.colors.length - 1, {
          duration: portraitData.animationDuration / portraitData.colors.length,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    };

    const animateMotifs = () => {
      motifOpacity.value = withSequence(
        withDelay(1000, withTiming(1, { duration: 2000 })),
        withRepeat(
          withSequence(
            withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
        )
      );
    };

    const animateText = () => {
      textOpacity.value = withDelay(1500, withTiming(1, { duration: 1500 }));
    };

    const animateScale = () => {
      scaleValue.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    };

    const animateRotation = () => {
      rotationValue.value = withRepeat(
        withTiming(360, { duration: 20000, easing: Easing.linear }),
        -1,
        false
      );
    };

    animateColors();
    animateMotifs();
    animateText();
    animateScale();
    animateRotation();
  }, [portraitData]);

  const backgroundColorStyle = useAnimatedStyle(() => {
    if (!portraitData) return { backgroundColor: '#2D5A27' };

    const colors = portraitData.colors;
    const index = Math.floor(colorIndex.value) % colors.length;
    const nextIndex = (index + 1) % colors.length;
    const progress = colorIndex.value % 1;

    return {
      backgroundColor: interpolateColor(
        progress,
        [0, 1],
        [colors[index], colors[nextIndex]]
      ),
    };
  });

  const motifStyle = useAnimatedStyle(() => ({
    opacity: motifOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: (1 - textOpacity.value) * 20 }],
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotationValue.value}deg`,
      },
    ],
  }));

  if (!portraitData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Portrait data not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBackground, backgroundColorStyle]}>
        <Animated.View style={[styles.contentContainer, scaleStyle]}>
          <Animated.View style={[styles.motifLayer, motifStyle]}>
            <Animated.View style={[styles.motif, styles.motif1, rotationStyle]}>
              <Motif type="leaves" />
            </Animated.View>
            <Animated.View style={[styles.motif, styles.motif2, rotationStyle]}>
              <Motif type="roots" />
            </Animated.View>
            <Animated.View style={[styles.motif, styles.motif3, rotationStyle]}>
              <Motif type="sun" />
            </Animated.View>
            <Animated.View style={[styles.motif, styles.motif4, rotationStyle]}>
              <Motif type="birds" />
            </Animated.View>
          </Animated.View>

          <Animated.View style={[styles.textContainer, textStyle]}>
            <View style={styles.handDrawnBorder}>
              <Text style={styles.title}>{portraitData.title}</Text>
            </View>
            <View style={styles.handDrawnBorder}>
              <Text style={styles.subtitle}>{portraitData.subtitle}</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>📤 Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const Motif: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'leaves':
      return (
        <View style={styles.motifContent}>
          <Text style={styles.motifText}>🌿</Text>
        </View>
      );
    case 'roots':
      return (
        <View style={styles.motifContent}>
          <Text style={styles.motifText}>🌱</Text>
        </View>
      );
    case 'sun':
      return (
        <View style={styles.motifContent}>
          <Text style={styles.motifText}>☀️</Text>
        </View>
      );
    case 'birds':
      return (
        <View style={styles.motifContent}>
          <Text style={styles.motifText}>🕊️</Text>
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  animatedBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motifLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motif: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motif1: {
    top: '15%',
    left: '10%',
  },
  motif2: {
    bottom: '15%',
    right: '10%',
  },
  motif3: {
    top: '10%',
    right: '15%',
  },
  motif4: {
    bottom: '20%',
    left: '15%',
  },
  motifContent: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  motifText: {
    fontSize: 40,
  },
  textContainer: {
    paddingHorizontal: 40,
    paddingVertical: 60,
    alignItems: 'center',
  },
  handDrawnBorder: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    color: '#DEB887',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 32,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  shareButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#2D5A27',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default AnimatedPortraitScreen;
