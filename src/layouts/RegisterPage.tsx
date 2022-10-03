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
    <div className="container">
      <div
        className="row"
        style={{ paddingBottom: '65px', paddingTop: '65px' }}
      >
        <div className="col-md-6 offset-md-3 shadow p-3 bg-light bg-gradient rounded-3">
          {formType === 'first' ? (
            <>
              <h4 className="mb-1 text-center text-primary">Registration</h4>
              <h5 className="mb-1 text-primary">Step SignUpInfo</h5>
              <SignUpInfo formType={toggleFormType} />
            </>
          ) : (
            <>
              <h4 className="mb-1 text-center text-primary">Registration</h4>
              <h5 className="mb-1 text-primary">Step PersonalInfo</h5>
              <PersonalInfo formType={toggleFormType} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
