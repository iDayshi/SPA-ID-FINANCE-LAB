import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/textField';
import SelectField from '../common/selectField';
import RadioField from '../common/radioField';
import CheckBoxField from '../common/checkBoxField';
import { getHobbies } from '../../store/hobby';
import { useSelector } from 'react-redux';
import { getOceans } from '../../store/ocean';
import shema from '../../data/schema.json';

type IErrors = {
  firstName?: string;
  lastName?: string;
  sex?: string;
  birthday?: string;
  ocean?: string;
  hobbies?: string[];
};

const PersonalInfo = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    sex: 'male',
    birthday: '',
    ocean: '',
    hobbies: [],
  });

  const [errors, setErrors] = useState<IErrors>({});
  const hobbies: string[] = useSelector(getHobbies());
  const oceans = useSelector(getOceans());

  const handleChange = (target: {
    name: string;
    value: string;
    checked?: boolean;
  }) => {
    console.log(target);

    setData((PrevState) => ({
      ...PrevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    firstName: {
      isRequired: shema.firstName.required
        ? { message: 'Электронная почта обязательна для заполнения' }
        : '',
      min: {
        message: `First Name must be at least ${shema.firstName.minLength} characters long`,
        value: shema.firstName.minLength,
      },
      max: {
        message: `First Name must be maximum ${shema.firstName.maxLength} characters`,
        value: shema.firstName.maxLength,
      },
    },
    lastName: {
      isRequired: shema.lastName.required
        ? { message: 'Имя обязательно для заполнения' }
        : '',
      min: {
        message: `Password must be at least ${shema.password.minLength} characters long`,
        value: shema.password.minLength,
      },
      max: {
        message: `Password must be maximum ${shema.password.maxLength} characters`,
        value: shema.password.maxLength,
      },
    },
    sex: {
      isRequired: shema.sex.required
        ? {
            message: 'Please select your gender',
          }
        : '',
    },
    ocean: {
      isRequired: shema.ocean.required
        ? {
            message: 'Please select your favorite ocean',
          }
        : '',
    },
    hobbies: {
      isRequired: shema.hobby.required
        ? {
            message: 'Please select your hobbies',
          }
        : '',
    },
  };

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = () => {
    const errors: IErrors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    // const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    // dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firsName"
        value={data.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Choose your gender"
      />
      <SelectField
        label="choose your favorite ocean"
        defaultOption="Choose..."
        options={oceans}
        name="ocean"
        onChange={handleChange}
        value={data.ocean}
        error={errors.ocean}
      />
      {hobbies.map((hobby) => {
        return (
          <CheckBoxField
            value={hobby}
            onChange={handleChange}
            name="hobbies"
            error={errors.hobbies}
          />
        );
      })}

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default PersonalInfo;
