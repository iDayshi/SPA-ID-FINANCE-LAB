import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/textField';
import SelectField from '../common/selectField';
import RadioField from '../common/radioField';
import CheckBoxField from '../common/checkBoxField';
import { getHobbies } from '../../store/hobby';
import { useDispatch, useSelector } from 'react-redux';
import { getOceans } from '../../store/ocean';
import shema from '../../data/schema.json';
import ModalWindow from '../common/modalWindow';
import { updatePersonalInfo } from '../../store/personalInfo';
import DateField from '../common/dateField';

type IErrors = {
  firstName?: string;
  lastName?: string;
  sex?: string;
  day?: string;
  month?: string;
  year?: string;
  age?: string;
  ocean?: string;
  hobbies?: string;
};

type IPersonalInfo = {
  firstName: string;
  lastName: string;
  sex: string;
  day: string;
  month: string;
  year: string;
  age: string;
  ocean: string;
  hobbies: string[];
};

const PersonalInfo = ({ formType }: { formType: () => void }) => {
  const [data, setData] = useState<IPersonalInfo>({
    firstName: '',
    lastName: '',
    sex: '',
    day: '',
    month: '',
    year: '',
    age: '',
    ocean: '',
    hobbies: [],
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<IErrors>({});
  const [modalShow, setModalShow] = useState(false);
  const hobbies: string[] = useSelector(getHobbies());
  const oceans: string[] = useSelector(getOceans());

  const handleChange = (target: {
    name: string;
    value: string;
    checked?: boolean;
  }) => {
    if (target.name === 'hobbies') {
      data.hobbies?.push(target.value);
    }

    if (
      target.name === 'day' ||
      target.name === 'month' ||
      target.name === 'year'
    ) {
      let today = new Date();
      let birthDate = new Date(
        target.name === 'year' ? +target.value : +data.year,
        target.name === 'month' ? +target.value - 1 : +data.month - 1,
        target.name === 'day' ? +target.value : +data.day
      );

      let ageUser = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        ageUser--;
      }
      setData((PrevState) => ({
        ...PrevState,
        age: ageUser.toString(),
      }));
    }

    const newData =
      target.name === 'hobbies'
        ? target.checked
          ? data.hobbies
          : data.hobbies?.filter((hobby) => hobby !== target.value)
        : target.value;

    setData((PrevState) => ({
      ...PrevState,
      [target.name]: newData,
    }));
  };

  const validatorConfig = {
    firstName: {
      isRequired: shema.firstName.required
        ? { message: 'First Name is required' }
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
        ? { message: 'Last Name is required' }
        : '',
      min: {
        message: `Password must be at least ${shema.password.minLength} characters long`,
        value: shema.lastName.minLength,
      },
      max: {
        message: `Password must be maximum ${shema.password.maxLength} characters`,
        value: shema.lastName.maxLength,
      },
    },
    sex: {
      isRequired: shema.sex.required
        ? {
            message: 'Please select your gender',
          }
        : '',
    },
    day: {
      isRequired: shema.firstName.required
        ? { message: 'Day is required' }
        : '',
      minDate: {
        message: `Minimum 1`,
        value: 1,
      },
      maxDate: {
        message: `Maximum 31`,
        value: 31,
      },
    },
    month: {
      isRequired: shema.firstName.required
        ? { message: 'Month is required' }
        : '',
      minDate: {
        message: `Minimum 1`,
        value: 1,
      },
      maxDate: {
        message: `Minimum 12`,
        value: 12,
      },
    },
    year: {
      isRequired: shema.firstName.required
        ? { message: 'Year is required' }
        : '',
      minDate: {
        message: `Minimum 1900`,
        value: 1900,
      },
      maxDate: {
        message: `Maximum 2050`,
        value: 2050,
      },
    },
    age: {
      isRequired: shema.sex.required
        ? {
            message: 'Please enter your birthday',
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

  const handleSubmit = () => {
    // @ts-ignore
    dispatch(updatePersonalInfo({ payload: data }));
    setModalShow(!modalShow);
  };

  return modalShow ? (
    <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
  ) : (
    <form>
      <TextField
        label="First Name"
        name="firstName"
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
        error={errors.sex}
      />
      <p className="m-1">Your birthday</p>
      <DateField
        day={data.day}
        month={data.month}
        year={data.year}
        onChange={handleChange}
        error={errors}
      />
      {errors && (
        <div
          style={{
            width: '100%',
            marginTop: '0.25rem',
            fontSize: '0.875em',
            color: '#dc3545',
          }}
        >
          {errors.age}
        </div>
      )}
      <SelectField
        label="Your favorite ocean"
        defaultOption="Choose..."
        options={oceans}
        name="ocean"
        onChange={handleChange}
        error={errors.ocean}
      />
      <div>
        <p className="m-1">Your favorite hobbies</p>
        <div className="d-flex flex-row">
          {hobbies.map((hobby) => {
            return (
              <CheckBoxField
                key={hobby}
                value={hobby}
                onChange={handleChange}
                name="hobbies"
                error={errors.hobbies}
              />
            );
          })}
        </div>
        {errors && (
          <div
            style={{
              width: '100%',
              marginTop: '0.25rem',
              fontSize: '0.875em',
              color: '#dc3545',
            }}
          >
            {errors.hobbies}
          </div>
        )}
      </div>
      <div className="d-flex flex-row">
        <button className="btn btn-warning w-100 m-1" onClick={formType}>
          Change SingUp
        </button>
        <button
          className="btn btn-info w-100 m-1"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Complete
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
