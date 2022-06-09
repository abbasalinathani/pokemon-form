import { Container, TextField } from '@mui/material';
import { useState } from 'react';
import './Form.scss';

function Form() {
  const [fullName, setFullName] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [codeName, setCodeName] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const badNewName = 'Input text';
  const minLengthHelperText = 'Please enter at least 3 characters';

  const fullNameChange = (value: string): void => {
    const error: boolean = value.toLowerCase() === badNewName.toLowerCase();
    setFullName({
      value,
      error,
      helperText: error ? "We know that's not yo name!!" : '',
    });
  };

  const checkLength = (value: string, fieldName: string): void => {
    switch (fieldName) {
      case 'fullName':
        if (value.length < 3) {
          setFullName({
            ...fullName,
            error: true,
            helperText: minLengthHelperText,
          });
        } else {
          setFullName({ ...fullName, error: false, helperText: '' });
        }
        break;
      case 'codeName':
        if (value.length < 3) {
          setCodeName({
            ...codeName,
            error: true,
            helperText: minLengthHelperText,
          });
        } else {
          setCodeName({ ...codeName, error: false, helperText: '' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <Container className='container'>
      <div className='header'>Fill This Form</div>
      <div className='sub-header'>
        We'll use this info to dominate the poke world! Muhahahahah
      </div>
      <div className='full-name'>
        <TextField
          error={fullName.error}
          id='filled-basic'
          label='Full Name'
          variant='filled'
          value={fullName.value}
          helperText={fullName.error ? fullName.helperText : ''}
          onChange={(event) => fullNameChange(event.target.value)}
          onBlur={(event) => checkLength(event.target.value, 'fullName')}
        />
      </div>

      <TextField
        error={codeName.error}
        id='filled-basic'
        label='Code Name'
        variant='filled'
        value={codeName.value}
        helperText={codeName.error ? codeName.helperText : ''}
        onChange={(event) =>
          setCodeName({
            value: event.target.value,
            error: false,
            helperText: '',
          })
        }
        className='code'
        onBlur={(event) => checkLength(event.target.value, 'codeName')}
      />
    </Container>
  );
}

export default Form;
