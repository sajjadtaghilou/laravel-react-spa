import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {register} from '../../api/auth';
import useInputValue from '../../components/input-value';

function Register () {
  let history = useHistory();
  let { onRegister } = useAuth();
  let { value: email, bind: bindEmail, error: emailError, parseServerError: parseEmailError } = useInputValue();
  let { value: name, bind: bindName, error: nameError, parseServerError: parseNameError } = useInputValue();
  let { value: password, bind: bindPassword, error: passwordError, parseServerError: parsePasswordError } = useInputValue();
  let { value: passwordConfirmation, bind: bindPasswordConfirmation } = useInputValue();

  const handleSubmit = onRegister => e => {
    e.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    }).then(({user, token}) => {
      onRegister({user, token});
      history.push('/home');
    }).catch(error => {
      [parseEmailError, parseNameError, parsePasswordError].forEach(fn => fn(error));
    });
  };

  return (
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
          <span className="text-gray-700">Or</span> <Link to="/signin" className="underline">sign in to your account</Link>
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
              type="text"
              id="username"
              name="name"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${naeError ? 'border-red' : ''}`}
              required
              autoFocus
              {...bindName} />

            { nameError && <p className="text-red text-xs pt-2">{nameError}</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${emailError ? 'border-red' : ''}`}
              required
              {...bindEmail} />

            { emailError && <p className="text-red text-xs pt-2">{ emailError }</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100  ${passwordError ? 'border-red' : ''}`}
              minLength={6}
              required
              {...bindPassword}/>

            { passwordError && <p className="text-red text-xs pt-2">{ passwordError }</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
            <input
              type="password"
              id="password-confirmation"
              name="password_confirmation"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${passwordError ? 'border-red' : ''}`}
              required
              {...bindPasswordConfirmation}/>
          </div>

          <div className="mb-4">
            <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
