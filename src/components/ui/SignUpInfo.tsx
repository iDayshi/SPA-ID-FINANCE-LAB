import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/textField';
import shema from '../../data/schema.json';
import { useDispatch, useSelector } from 'react-redux';
import { getSignUpInfo, updateSignUpInfo } from '../../store/signUpInfo';

type IErrors = {
  phone?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

const SignUpInfo = ({ formType }: { formType: () => void }) => {
  const qualities = useSelector(getSignUpInfo());
  const [data, setData] = useState(
    qualities || {
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (target: { name: string; value: string }) => {
    setData((PrevState: any) => ({
      ...PrevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    phone: {
      isRequired: shema.mobilePhone.required
        ? { message: 'Phone number is required' }
        : '',
      isPhone: {
        message: 'Phone entered incorrectly',
      },
    },
    email: {
      isRequired: shema.email.required ? { message: 'Email is required' } : '',
      isEmail: {
        message: 'Email entered incorrectly',
      },
    },
    password: {
      isRequired: shema.password.required
        ? { message: 'Password number is required' }
        : '',
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter',
      },
      isContainDigit: {
        message: 'Password must contain at least one number',
      },
      min: {
        message: `Password must be at least ${shema.password.minLength} characters long`,
        value: shema.password.minLength,
      },
      max: {
        message: `Password must be maximum ${shema.password.maxLength} characters`,
        value: shema.password.maxLength,
      },
    },
    repeatPassword: {
      isRequired: shema.password.required
        ? { message: 'Repeat password number is required' }
        : '',
      isRepeat: {
        message: 'Passwords do not match',
      },
    },
  };

  const validate = () => {
    const errors: IErrors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // @ts-ignore
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;
    // @ts-ignore
    dispatch(updateSignUpInfo({ payload: data }));
    formType();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mobile phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          error={errors?.phone}
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors?.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors?.password}
        />
        <TextField
          label="Repeat password"
          type="password"
          name="repeatPassword"
          value={data.repeatPassword}
          onChange={handleChange}
          error={errors?.repeatPassword}
        />
        <button
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
          onClick={handleSubmit}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignUpInfo;
