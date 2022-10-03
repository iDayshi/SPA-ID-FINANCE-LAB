import React, { FC } from 'react';

type IOptions = {
  name: string;
  value: string;
};

type IDateField = {
  label: string;
  name: string;
  onChange: (target: { name: string; value: string }) => void;
  error?: any;
};

const DateField: FC<IDateField> = ({ label, name, onChange, error }) => {
  const handleChange = ({ target }: { target: IOptions }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select w-25' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-3 d-flex">
      <input
        type="text"
        id={name}
        name={name}
        value={''}
        onChange={handleChange}
        className={getInputClasses()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default DateField;
