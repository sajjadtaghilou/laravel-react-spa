import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {resetPassword} from '../../api/auth';
import useFormError from '../../components/FormError';

function ResetPassword () {
  const token = useRouteMatch().params.token;

  let { hasError, getError, parseServerError, setError } = useFormError();
  let { passwordResetFeedback, setPasswordResetFeedback } = useState('');
  let initialForm = {
    email: '',
    password: '',
    password_confirmation: ''
  };

  let [resetPasswordForm, setRestPasswordForm] = useState(initialForm);

  const handleInputChange = e => {
    e.persist();
    setRestPasswordForm({ ...resetPasswordForm, [e.target.name]: e.target.value });
    setError({ [e.target.name]: '' });
    setPasswordResetFeedback('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    resetPassword({...resetPasswordForm, token})
      .then(({status}) => {
        setRestPasswordForm({ ...initialForm });
        setPasswordResetFeedback(status);
      }).catch(error => {
        setError(parseServerError(error));
        setPasswordResetFeedback('');
      });
  };

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-gray-200">

      { resetPasswordForm.resetMessage !== '' && (
        <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
          <p> {passwordResetFeedback}
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
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker ${hasError('email') ? 'border-red' : ''}`}
            placeholder="e.g.jane@example.com"
            required
            autoFocus
          />

          {hasError('email') &&
                <p className="text-red-500 text-xs pt-2">{getError('email')}</p>
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
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError('password') ? 'border-red' : ''}`}
            minLength={8}
            required />

          {hasError('password') &&
                <p className="text-red-500 text-xs pt-2">{getError('password')}</p>
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
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError('password') ? 'border-red' : ''}`}
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
