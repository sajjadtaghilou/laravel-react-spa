import { useState, useCallback } from 'react';

function InputValue () {
  let [value, setValue] = useState('');
  let [error, setError] = useState('');

  let onChange = useCallback(function (event) {
    setValue(event.currentTarget.value);
    setError('');
  }, []);

  let parseServerError = (error, field) => {
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
    parseServerError
  };
}

export default InputValue;
