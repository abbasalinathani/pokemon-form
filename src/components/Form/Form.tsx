import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { CustomSlider } from '../../styledComponents/slider';
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
  const [region, setRegion] = useState('');
  const badNewName = 'Input text';
  const minLengthHelperText = 'Please enter at least 3 characters';
  const regions = ['Kanto', 'Jhoto', 'Hoenn'];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pokemons: {
    name: string;
    region: string;
  }[] = [
    { name: 'Bulbasaur', region: regions[0] },
    { name: 'Charmander', region: regions[0] },
    { name: 'Squirtle', region: regions[0] },
    { name: 'Chikorita', region: regions[1] },
    { name: 'Cyndaquil', region: regions[1] },
    { name: 'Totodyle', region: regions[1] },
    { name: 'Treeko', region: regions[2] },
    { name: 'Torchik', region: regions[2] },
    { name: 'Mudkip', region: regions[2] },
  ];

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

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  return (
    <Container className='container'>
      <div className='form-container'>
        <div className='header'>Fill This Form</div>
        <div className='sub-header'>
          We'll use this info to dominate the poke world! Muhahahahah
        </div>
        <div className='full-name-container'>
          <TextField
            error={fullName.error}
            id='filled-basic'
            label='Full Name'
            variant='filled'
            value={fullName.value}
            helperText={fullName.error ? fullName.helperText : ''}
            onChange={(event) => fullNameChange(event.target.value)}
            onBlur={(event) => checkLength(event.target.value, 'fullName')}
            className='full-name'
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
        <CustomSlider
          valueLabelDisplay='auto'
          aria-label='slider'
          defaultValue={60}
          className='slider'
        />
        <span className='slider-description'>
          How far is your nearest pokemon center? (In KMs)
        </span>
        <Select
          value={region}
          onChange={handleRegionChange}
          displayEmpty
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return (
                <span className='menu-item'>What's your starting region?</span>
              );
            }
            return selected;
          }}
          className='region-select'
          variant='filled'
        >
          {regions.map((region) => (
            <MenuItem value={region}>{region}</MenuItem>
          ))}
        </Select>
        <div className='choose-starter-pokemon'>
          Choose your starter pokemon
        </div>
      </div>
    </Container>
  );
}

export default Form;
