import { useState, useCallback } from 'react';

function InputValue (field) {
  let [value, setValue] = useState('');
  let [error, setError] = useState('');

  let onChange = useCallback(function (event) {
    setValue(event.currentTarget.value);
    setError('');
  }, []);

  let parseServerError = error => {
    console.log('error', error);

    if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[field]) {
      setError(error.response.data.errors[field][0]);
    }
  };

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange
    },
    error,
    setError,
    parseServerError
  };
}

export default InputValue;
