import { useState } from 'react';

function FormError () {
  console.log('form error running...');
  let [formError, setFormError] = useState({});

  const hasError = field => {
    return !!formError[field];
  };

  const getError = field => {
    let [error] = formError[field];
    return error;
  };

  const parseServerError = error => {
    if (error.response && error.response.data && error.response.data.errors) {
      setFormError(error.response.data.errors);
    }
  };

  const setError = error => {
    setFormError(prevState => {
      return {
        ...prevState,
        ...error
      };
    });
  };

  return { hasError, getError, setError, parseServerError };
}

export default FormError;
