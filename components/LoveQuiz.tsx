
import React, { useState } from 'react';
import { generateLoveQuiz } from '../services/geminiService';

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

const LoveQuiz: React.FC<{ name: string }> = ({ name }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    const quiz = await generateLoveQuiz(name || "Your Love");
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (index === questions[currentIndex].answerIndex) {
      setScore(score + 1);
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-xl">
        <div className="text-6xl animate-spin mb-6">💖</div>
        <h3 className="text-2xl font-romantic font-bold text-rose-500">Generating Our Quiz...</h3>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center bg-white/80 backdrop-blur-md rounded-[3rem] border border-rose-100 shadow-xl animate-fade-in">
        <div className="text-7xl mb-6">🏆</div>
        <h3 className="text-3xl font-romantic font-bold text-rose-600 mb-2">Quiz Finished!</h3>
        <p className="text-xl text-gray-600 mb-6 font-medium">Your Score: {score} / {questions.length}</p>
        <p className="text-gray-500 italic mb-8">
          {score === questions.length ? "You know everything! You're the perfect partner." : "Every day is a new chance to learn more about our love."}
        </p>
        <button 
          onClick={startQuiz}
          className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIndex];
    return (
      <div className="max-w-xl mx-auto p-10 bg-white/90 backdrop-blur-md rounded-[3rem] border border-rose-100 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-rose-300">Question {currentIndex + 1} / {questions.length}</span>
          <span className="text-xl">💝</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">{q.question}</h3>
        <div className="space-y-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left px-6 py-4 rounded-2xl border-2 border-rose-50 hover:border-rose-300 hover:bg-rose-50 transition-all font-medium text-gray-700"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-12 text-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-xl">
      <div className="text-6xl mb-6">🧠</div>
      <h3 className="text-3xl font-romantic font-bold text-rose-600 mb-2">Love Quiz</h3>
      <p className="text-gray-500 mb-8 italic">How well do you know your sweetheart?</p>
      <button 
        onClick={startQuiz}
        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-xs"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default LoveQuiz;
