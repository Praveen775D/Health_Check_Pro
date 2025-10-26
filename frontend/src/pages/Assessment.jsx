import React, { useEffect, useState } from "react";
import axios from "axios";

const Assessment = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`/api/questions?category=${category}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, [category]);

  const handleOptionChange = (qId, answer) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{category} Assessment</h2>
      {questions.map((q, index) => (
        <div key={q._id} className="mb-4">
          <p className="font-medium">{index + 1}. {q.questionText}</p>
          {q.options.map(option => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={() => handleOptionChange(q._id, option)}
                />
                {" "}{option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default Assessment;
