import React from "react";

interface CatProps {
  onClick: () => void;
  disabled: boolean;
  feedback: string | null;
  isCorrect: boolean;
}

const Cat: React.FC<CatProps> = ({
  onClick,
  disabled,
  feedback,
  isCorrect,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div className="cat-container">
      <svg
        className={`cat ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 20 L30 50 L70 50 Z"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="40" cy="40" r="3" />
        <circle cx="60" cy="40" r="3" />
        <path
          d="M45 50 Q50 55 55 50"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      {feedback && (
        <div
          className={`feedback ${
            isCorrect ? "feedback-correct" : "feedback-incorrect"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default Cat;
