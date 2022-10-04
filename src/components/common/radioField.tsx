import React, { FC } from 'react';

type IOptions = {
  name: string;
  value: string;
};

interface IRadioField {
  error?: string;
  label: string;
  value?: string;
  name: string;
  options: IOptions[];
  onChange: ({ name, value }: IOptions) => void;
}

const RadioField: FC<IRadioField> = ({
  options,
  name,
  onChange,
  value,
  label,
  error,
}) => {
  const handleChange = ({ target }: { target: IOptions }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + '_' + option.value}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + '_' + option.value}
              checked={option.value === value}
              value={option.value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + '_' + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
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
      </div>
    </div>
  );
};

export default RadioField;
