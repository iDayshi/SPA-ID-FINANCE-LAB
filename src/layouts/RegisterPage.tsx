import React, { useEffect, useState } from 'react';
import SignUpInfo from '../components/ui/SignUpInfo';
import PersonalInfo from '../components/ui/PersonalInfo';
import { useDispatch } from 'react-redux';
import { loadingHobbiesList } from '../store/hobby';
import { loadingOceansList } from '../store/ocean';

const RegisterPage = () => {
  const [formType, setFormType] = useState('first');
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(loadingHobbiesList());
    // @ts-ignore
    dispatch(loadingOceansList());
  }, [dispatch]);

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === 'first' ? 'second' : 'first'));
  };

  return (
    <div className="container mt-3 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 bg-light bg-gradient rounded-3">
          {formType === 'first' ? (
            <>
              <h3 className="mb-4">Registration Step 1</h3>
              <SignUpInfo formType={toggleFormType} />
            </>
          ) : (
            <>
              <h3 className="mb-4">Registration Step 2</h3>
              <PersonalInfo formType={toggleFormType} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
