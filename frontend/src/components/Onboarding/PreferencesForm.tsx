import React from 'react';

interface PreferencesFormProps {
  onSubmit: (preferences: Record<string, any>) => void;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
  return (
    <form className="preferences-form">
      <h2>Your Preferences</h2>
      {/* Add preferences selection form */}
    </form>
  );
};

export default PreferencesForm; 