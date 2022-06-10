import {
  Chip,
  Container,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomSlider } from '../../styledComponents/slider';
import OrderForm from '../OrderForm/OrderForm';
import './Form.scss';

interface Pokemon {
  name: string;
  region: string;
}

interface CartItem {
  item: string;
  quantity: number;
  cost: number;
  bag: boolean;
}

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
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const badNewName = 'Input text';
  const minLengthHelperText = 'Please enter at least 3 characters';
  const regions = ['Kanto', 'Jhoto', 'Hoenn'];
  const pokemons: Pokemon[] = [
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

  const onOrderDialogClose = (
    item: string,
    quantity: number,
    bag: boolean,
    cost: number
  ) => {
    setOrderDialogOpen(false);
    setCart([...cart, { item, quantity, bag, cost }]);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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
          onChange={(event) => setRegion(event.target.value)}
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
          {regions.map((region, index) => (
            <MenuItem value={region} key={index}>
              {region}
            </MenuItem>
          ))}
        </Select>
        {region && (
          <div style={{ width: '100%' }}>
            <div className='choose-starter-pokemon'>
              Choose your starter pokemon
            </div>
            <div className='pokemon-container'>
              {pokemons
                .filter((pokemon) => pokemon.region === region)
                .map((pokemon, index) => (
                  <div
                    className={`pokemon-image-container ${
                      selectedPokemon === pokemon.name ? 'selected-pokemon' : ''
                    }`}
                    onClick={() => setSelectedPokemon(pokemon.name)}
                    key={index}
                  >
                    <img
                      src={require(`../../assets/${pokemon.name}.png`)}
                      alt=''
                      key={index}
                      className='pokemon-image'
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className='packing-question-container'>
          <div className='packing-question'>What do you want to pack?</div>
          <div className='add-button' onClick={() => setOrderDialogOpen(true)}>
            <span className='button-text'>+</span>
          </div>
        </div>

        <OrderForm open={orderDialogOpen} onClose={onOrderDialogClose} />

        <div className='chip-container'>
          {cart.length > 0 &&
            cart.map((item, index) => (
              <Chip
                key={index}
                label={
                  <span className='chip-label'>
                    {item.quantity} {item.item}
                    {item.quantity > 1 ? 's' : ''}
                  </span>
                }
                className={`chip ${item.bag ? 'chip-with-bag' : ''}`}
                onDelete={() => {}}
                clickable={true}
                onClick={() => {}}
              />
            ))}
        </div>
      </div>
    </Container>
  );
}

export default Form;
