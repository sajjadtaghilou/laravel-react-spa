import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { destructServerError, hasError, getError } from '../../utils/formError';
import {resetPassword} from '../../api/auth';

function ResetPassword () {
  const token = useRouteMatch().params.token;

  let [resetPasswordForm, setRestPasswordForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    error: '',
    resetMessage: ''
  });

  const handleInputChange = e => {
    e.persist();

    setRestPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
      error: {
        ...resetPasswordForm.error,
        ...{ [e.target.name]: '' }
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    resetPassword({...resetPasswordForm, token})
      .then(({status}) => {
        setRestPasswordForm({ ...resetPasswordForm, resetMessage: status });
      }).catch(error => {
        resetPasswordForm({ ...resetPasswordForm, resetMessage: '', error: destructServerError(error) });
      });
  };

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-grey-300">

      { resetPasswordForm.resetMessage !== '' && (
        <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
          <p> {resetPasswordForm.resetMessage}
            <span className="pl-2">
                  Please
              <Link to="/login" className="no-underline text-grey-darker font-bold"> login </Link>
                  with your new password
            </span>
          </p>
        </div>
      ) }

      <form
        onSubmit={handleSubmit}
        method="POST"
        className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3 px-8 py-4">

        <h2 className="text-center mb-4 text-grey-darker">Reset Your Password</h2>
        <div className="mb-4">

          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                Enter your email address
          </label>
          <input
            value={resetPasswordForm.email}
            onChange={handleInputChange}
            id="email"
            type="email"
            name="email"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker ${hasError(resetPasswordForm.error, 'email') ? 'border-red' : ''}`}
            placeholder="e.g.jane@example.com"
            required
            autoFocus
          />

          {hasError(resetPasswordForm.error, 'email') &&
                <p className="text-red-500 text-xs pt-2">{getError(resetPasswordForm.error, 'email')}</p>
          }

        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
          <input
            value={resetPasswordForm.password}
            onChange={handleInputChange}
            type="password"
            id="password"
            name="password"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(resetPasswordForm.error, 'password') ? 'border-red' : ''}`}
            minLength={8}
            required />

          {hasError(resetPasswordForm.error, 'password') &&
                <p className="text-red-500 text-xs pt-2">{getError(resetPasswordForm.error, 'password')}</p>
          }
        </div>

        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
          <input
            value={resetPasswordForm.password_confirmation}
            onChange={ handleInputChange }
            type="password"
            id="password-confirmation"
            name="password_confirmation"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(resetPasswordForm.error, 'password') ? 'border-red' : ''}`}
            required />
        </div>

        <div className="mt-6 mb-2">
          <button type="submit"
            className="border rounded-full p-3 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
                Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
