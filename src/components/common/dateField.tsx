import React, { FC } from 'react';

type IOptions = {
  name: string;
  value: string;
};

type IDateField = {
  day: string;
  month: string;
  year: string;
  onChange: (target: { name: string; value: string }) => void;
  error?: any;
};

const DateField: FC<IDateField> = ({ day, month, year, onChange, error }) => {
  const handleChange = ({ target }: { target: IOptions }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-control' + (Object.keys(error).length ? ' is-invalid' : '');
  };

  return (
    <div className="mb-3 d-flex flex-column">
      <label htmlFor="day">Day</label>
      <input
        type="text"
        id="day"
        name="day"
        value={day}
        onChange={handleChange}
        className={getInputClasses()}
        placeholder="XX"
        maxLength={2}
      />
      {error && <div className="invalid-feedback">{error.day}</div>}
      <label htmlFor="month">Month</label>
      <input
        type="text"
        id="month"
        name="month"
        value={month}
        onChange={handleChange}
        className={getInputClasses()}
        placeholder="XX"
        maxLength={2}
      />
      {error && <div className="invalid-feedback">{error.month}</div>}
      <label htmlFor="year">year</label>
      <input
        type="text"
        id="year"
        name="year"
        value={year}
        onChange={handleChange}
        className={getInputClasses()}
        placeholder="XXXX"
        maxLength={4}
      />
      {error && <div className="invalid-feedback">{error.year}</div>}
    </div>
  );
};

export default DateField;
