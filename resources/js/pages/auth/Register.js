import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { destructServerError, hasError, getError } from '../../utils/formError';
import {AuthConsumer} from '../../context/auth';
import {register} from '../../api/auth';

function Register () {
  let [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    error: {}
  });

  const handleInputChange = e => {
    e.persist();
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
      error: {
        ...registerForm.error,
        ...{ [e.target.name]: '' }
      }
    });
  };

  const handleSubmit = onRegister => e => {
    e.preventDefault();
    register(registerForm).then(({user, token}) => {
      onRegister({user, token});
      useHistory().push('/home');
    }).catch(error => {
      setRegisterForm(prevState => {
        return {
          ...prevState,
          error: destructServerError(error)
        };
      });
    });
  };

  return (
    <AuthConsumer>
      {
        ({onRegister}) => (
          <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-gray-200">

            <div className="p-8 flex flex-col items-center">
              <div>
                <Link
                  to="/"
                >  <img width="48"
                    className="align-middle mx-2"
                    alt="Google"
                    title="Google"
                    src="/images/icons/laravel.svg" />
                </Link>
              </div>
              <div className="text-2xl leading-loose">
              Start your free trial
              </div>
              <div className="text-gray-800">
                <span className="text-gray-700">Or</span> <Link to="/login" className="underline">sign in to your account</Link>
              </div>
            </div>

            <div className="bg-white border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
              <form onSubmit={handleSubmit(onRegister)}
                method="POST"
              >
                <div className="mb-4 mt-2">
                  <label className="block text-gray-700 text-sm mb-1 font-bold" htmlFor="username">
                  Username
                  </label>
                  <input
                    value={registerForm.name}
                    onChange={handleInputChange}
                    type="text"
                    id="username"
                    name="name"
                    className="appearance-none border rounded w-full py-1 px-3 bg-gray-100 leading-tight"
                    required
                    autoFocus />

                  {hasError(registerForm.error, 'name') &&
                  <p className="text-red text-xs pt-2">{getError(registerForm.error, 'name')}</p>
                  }
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                  Email address
                  </label>
                  <input
                    value={registerForm.email}
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    type="email"
                    className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${hasError(registerForm.error, 'name') ? 'border-red' : ''}`}
                    required />

                  {hasError(registerForm.error, 'email') &&
                  <p className="text-red text-xs pt-2">{getError(registerForm.error, 'email')}</p>
                  }
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                  <input
                    value={registerForm.password}
                    onChange={handleInputChange}
                    type="password"
                    id="password"
                    name="password"
                    className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100  ${hasError(registerForm.error, 'password') ? 'border-red' : ''}`}
                    minLength={6}
                    required />

                  {hasError(registerForm.error, 'password') &&
                  <p className="text-red text-xs pt-2">{getError(registerForm.error, 'password')}</p>
                  }
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                  <input
                    value={registerForm.password_confirmation}
                    onChange={handleInputChange}
                    type="password"
                    id="password-confirmation"
                    name="password_confirmation"
                    className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${hasError(registerForm.error, 'password') ? 'border-red' : ''}`}
                    required />
                </div>

                <div className="mb-4">
                  <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">Register</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </AuthConsumer>

  );
}

export default Register;
