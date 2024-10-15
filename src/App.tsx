import React, { useState, useEffect } from 'react';
import { Minus } from 'lucide-react';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateNumbers = () => {
    const firstNum = Math.floor(Math.random() * 90) + 10;
    const secondNum = Math.floor(Math.random() * (firstNum - 10 + 1)) + 10;
    setNum1(firstNum);
    setNum2(secondNum);
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = num1 - num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! Well done!');
    } else {
      setFeedback(`Oops! The correct answer was ${correctAnswer}.`);
    }
    setTimeout(generateNumbers, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Subtraction Game</h1>
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold">{num1}</span>
          <Minus className="mx-2" size={24} />
          <span className="text-4xl font-bold">{num2}</span>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your answer"
            required
          />
          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {feedback && (
          <p className={`text-center ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </p>
        )}
        <p className="text-center mt-4">Score: {score}</p>
      </div>
    </div>
  );
}

export default App;