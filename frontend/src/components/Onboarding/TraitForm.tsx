import React from 'react';

interface TraitFormProps {
  onSubmit: (traits: string[]) => void;
}

const TraitForm: React.FC<TraitFormProps> = ({ onSubmit }) => {
  console.log(onSubmit)
  return (
    <form className="trait-form">
      <h2>Tell us about yourself</h2>
      {/* Add trait selection form */}
    </form>
  );
};

export default TraitForm; 