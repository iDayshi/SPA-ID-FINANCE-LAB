import React from 'react';

const DateField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group has-validation">
        <input type="date" min="1900" max="2099" step="1" value="2018" />

        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

export default DateField;
