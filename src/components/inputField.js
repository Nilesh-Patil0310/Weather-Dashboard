import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}:</label>
      <input
        type={type}
        className="w-full p-2 border rounded"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
