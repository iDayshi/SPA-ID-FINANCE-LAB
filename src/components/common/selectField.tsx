import React, { FC } from 'react';

type IOptions = {
  name: string;
  value: string;
};

type ISelectField = {
  label: string;
  type?: string;
  name: string;
  defaultOption: string;
  options: string[];
  onChange: (target: { name: string; value: string }) => void;
  error?: string;
};

const SelectField: FC<ISelectField> = ({
  label,
  onChange,
  defaultOption,
  options,
  name,
  error,
}) => {
  const handleChange = ({ target }: { target: IOptions }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        onChange={handleChange}
        defaultValue={defaultOption}
      >
        <option value={defaultOption} disabled hidden>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
