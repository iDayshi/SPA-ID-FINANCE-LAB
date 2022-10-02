import React, { FC, useState } from 'react';

type ITextField = {
  label: string;
  type?: string;
  name: string;
  value: any;
  onChange: (target: { name: string; value: string }) => void;
  error?: any;
};

const PhoneFiled: FC<ITextField> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: { target: HTMLInputElement }) => {
    const target = event.target as HTMLInputElement;
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-2">
      <label htmlFor="tel">{label}</label>
      <div className="input-group has-validation">
        <input
          type="tel"
          id="tel"
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={'+375XXXXXXXXX'}
          pattern="/^\+375\d{9}$/"
          title={'asadasd'}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default PhoneFiled;
