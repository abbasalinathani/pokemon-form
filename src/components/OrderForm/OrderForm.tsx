import { Container, Dialog, MenuItem, Select, Switch } from '@mui/material';
import { useState } from 'react';
import { CustomSlider } from '../../styledComponents/slider';
import { CustomSwitch } from '../../styledComponents/switch';
import './OrderForm.scss';

export interface SimpleDialogProps {
  open: boolean;
}

function OrderForm(props: SimpleDialogProps) {
  const { open } = props;
  const [selectedItem, setSelectedItem] = useState('');
  const [needBag, setNeedBag] = useState(true);
  const orderItems = [
    'Poke Ball',
    'Great Ball',
    'Super Potion',
    'Hyper Potion',
  ];

  return (
    <Dialog open={open}>
      <Container className='container'>
        <div className='form-container'>
          <div className='header'>Place Your Order</div>
          <div className='sub-header'>
            We'll use this info to pack your order! Muhahahahahaha
          </div>

          <Select
            value={selectedItem}
            onChange={(event) => setSelectedItem(event.target.value)}
            displayEmpty
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <span className='menu-item'>Choose item</span>;
              }
              return selected;
            }}
            className='region-select'
            variant='filled'
          >
            {orderItems.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>

          <CustomSlider
            valueLabelDisplay='auto'
            aria-label='slider'
            defaultValue={2}
            className='slider'
            min={1}
            max={10}
          />
          <span className='slider-description'>Select Quantity</span>

          <div className='bag-question-container'>
            <div className='bag-question'>I need a bag for that!</div>
            <CustomSwitch
              checked={needBag}
              onChange={() => setNeedBag(!needBag)}
            />
          </div>
        </div>
      </Container>
    </Dialog>
  );
}

export default OrderForm;
