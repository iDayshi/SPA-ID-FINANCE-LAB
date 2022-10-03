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
  error?: string;
  options: string[];
};

const CheckBoxField: React.FC<ICheckBoxField> = ({
  name,
  options,
  onChange,
  error,
}) => {
  const [checked, setChecked] = useState(true);
  const handleChange = ({ target }: { target: { value: string } }) => {
    setChecked(!checked);
    onChange({ name: name, value: target.value, checked });
  };

  return (
    <>
      <div className="mb-2">
        {options.map((option) => (
          <div key={option} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value={option}
              id={option}
              onChange={handleChange}
              checked={!checked}
            />
            <label className="form-check-label" htmlFor={option}>
              {option}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <div
          style={{
            width: '100%',
            marginTop: '0.25rem',
            fontSize: '0.875em',
            color: '#dc3545',
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default CheckBoxField;
