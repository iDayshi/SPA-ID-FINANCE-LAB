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
  birthday?: string;
  ocean?: string;
  hobbies?: string;
};

type IPersonalInfo = {
  firstName?: string;
  lastName?: string;
  sex: string;
  birthday?: string;
  ocean?: string;
  hobbies?: string[];
};

const PersonalInfo = ({ formType }: { formType: () => void }) => {
  const [data, setData] = useState<IPersonalInfo>({
    firstName: '',
    lastName: '',
    sex: '',
    birthday: '',
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
      <DateField
        name="birthday"
        onChange={handleChange}
        error={errors.ocean}
      />
      <SelectField
        label="Your favorite ocean"
        defaultOption="Choose..."
        options={oceans}
        name="ocean"
        onChange={handleChange}
        error={errors.ocean}
      />

      <p className="m-1">Your favorite hobbies</p>
      <CheckBoxField
        onChange={handleChange}
        name="hobbies"
        options={hobbies}
        error={errors.hobbies}
      />

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
