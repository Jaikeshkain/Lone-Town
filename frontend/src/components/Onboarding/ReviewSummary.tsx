import React from 'react';

interface ReviewSummaryProps {
  traits: string[];
  preferences: Record<string, any>;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ traits, preferences }) => {
  console.log(traits,preferences)
  return (
    <div className="review-summary">
      <h2>Review Your Profile</h2>
      <div className="traits-summary">
        <h3>Your Traits</h3>
        {/* Display traits */}
      </div>
      <div className="preferences-summary">
        <h3>Your Preferences</h3>
        {/* Display preferences */}
      </div>
    </div>
  );
};

export default ReviewSummary; 