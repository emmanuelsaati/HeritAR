import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useApp } from '../context/AppContext';
import { getRandomQuestions, QuizQuestion } from '../data/quizData';

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

interface Props {
  navigation: QuizScreenNavigationProp;
}

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const { updateQuizScore } = useApp();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setQuestions(getRandomQuestions(5));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        fadeAnim.setValue(1);
      } else {
        const finalScore = Math.round((score / questions.length) * 100);
        updateQuizScore(finalScore);
        setQuizCompleted(true);
        fadeAnim.setValue(1);
      }
    });
  };

  const handleRestart = () => {
    setQuestions(getRandomQuestions(5));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading quiz...</Text>
        </View>
      </View>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = percentage >= 80;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultIcon}>{isPassed ? '🎉' : '📚'}</Text>
            <Text style={styles.resultTitle}>
              {isPassed ? 'Congratulations!' : 'Good Try!'}
            </Text>
            <Text style={styles.resultScore}>
              {score} / {questions.length}
            </Text>
            <Text style={styles.resultPercentage}>{percentage}%</Text>
            <Text style={styles.resultMessage}>
              {isPassed
                ? 'You have excellent knowledge of Sierra Leone heritage!'
                : 'Keep exploring to learn more about our heritage!'}
            </Text>

            {isPassed && (
              <View style={styles.achievementBadge}>
                <Text style={styles.achievementIcon}>🧠</Text>
                <Text style={styles.achievementText}>Quiz Master Achievement Unlocked!</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRestart}
            >
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            },
          ]}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.scoreText}>
              Score: {score}/{currentQuestionIndex}
            </Text>
          </View>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showExplanation && isCorrect;
              const showIncorrect = showExplanation && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    showCorrect && styles.optionCorrect,
                    showIncorrect && styles.optionIncorrect,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text
                    style={[
                      styles.optionText,
                      (isSelected || showCorrect) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {showCorrect && <Text style={styles.checkMark}>✓</Text>}
                  {showIncorrect && <Text style={styles.crossMark}>✗</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct! 🎉'
                  : 'Not quite...'}
              </Text>
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}

          {showExplanation && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2D5A27',
  },
  content: {
    padding: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  scoreText: {
    fontSize: 16,
    color: '#2D5A27',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 24,
    lineHeight: 32,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#2D5A27',
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionIncorrect: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  checkMark: {
    fontSize: 24,
    color: '#4CAF50',
  },
  crossMark: {
    fontSize: 24,
    color: '#F44336',
  },
  explanationContainer: {
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#DEB887',
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#2D5A27',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  resultIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 16,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 8,
  },
  resultPercentage: {
    fontSize: 24,
    color: '#DEB887',
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  achievementBadge: {
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DEB887',
  },
  achievementIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5A27',
  },
  primaryButton: {
    backgroundColor: '#2D5A27',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D5A27',
  },
  secondaryButtonText: {
    color: '#2D5A27',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
