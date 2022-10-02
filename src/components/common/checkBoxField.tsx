import React, { useState } from 'react';

type ICheckBoxField = {
  name: string;
  onChange: ({
    name,
    value,
  }: {
    name: string;
    value: string;
    checked: boolean;
  }) => void;
  error: any;
  value: string;
};

const CheckBoxField: React.FC<ICheckBoxField> = ({
  name,
  value,
  onChange,
  error,
}) => {
  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked(!checked);
    onChange({ name: name, value: value, checked });
  };

  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '');
  };

  return (
    <div key={value} className="form-check mb-3">
      <input
        className={getInputClasses()}
        type="checkbox"
        value={value}
        id={name}
        onChange={handleChange}
        checked={!checked}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {value}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBoxField;
