import React, { useState, useEffect } from 'react';
import { Minus, Delete } from 'lucide-react';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateNumbers = () => {
    let firstNum = Math.floor(Math.random() * 90) + 10;
    let secondNum = Math.floor(Math.random() * (firstNum - 10 + 1)) + 10;
    setNum1(firstNum);
    setNum2(secondNum);
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleNumberClick = (num: number) => {
    if (userAnswer.length < 3) {
      setUserAnswer(prevAnswer => prevAnswer + num);
    }
  };

  const handleDelete = () => {
    setUserAnswer(prevAnswer => prevAnswer.slice(0, -1));
  };

  const handleSubmit = () => {
    const correctAnswer = num1 - num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! Well done!');
    } else {
      setFeedback(`Oops! The correct answer was ${correctAnswer}.`);
    }
    setTimeout(generateNumbers, 0);
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
        <div className="mb-4">
          <input
            type="text"
            value={userAnswer}
            readOnly
            className="w-full p-2 border rounded text-center text-2xl"
            placeholder="Your answer"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberClick(0)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded col-span-2"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-100 hover:bg-red-200 text-red-800 font-bold py-2 px-4 rounded"
          >
            <Delete size={20} />
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
        {feedback && (
          <p className={`text-center mt-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </p>
        )}
        <p className="text-center mt-4">Score: {score}</p>
      </div>
    </div>
  );
}

export default App;