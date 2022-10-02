import React, { FC } from 'react';

type ISelectField = {
  label: string;
  type?: string;
  name: string;
  defaultOption: string;
  options: string[];
  value: any;
  onChange: (target: { name: string; value: string }) => void;
  error?: any;
};

const SelectField: FC<ISelectField> = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  name,
  error,
}) => {
  const handleChange = ({ target }) => {
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
        value={value._id}
        //@ts-ignore
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
