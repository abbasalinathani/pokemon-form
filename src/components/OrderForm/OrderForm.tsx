import {
  Container,
  Dialog,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../styledComponents/button';
import { CustomSlider } from '../../styledComponents/slider';
import { CustomSwitch } from '../../styledComponents/switch';
import { CartItem } from '../Form/Form';
import './OrderForm.scss';
import { v4 as uuid } from 'uuid';

export interface SimpleDialogProps {
  selectedChip: CartItem | undefined;
  open: boolean;
  onClose: (
    id: string,
    selectedItem: string,
    quantity: number,
    needBag: boolean,
    cost: number
  ) => void;
}

interface OrderItem {
  name: string;
  cost: number;
}

function OrderForm(props: SimpleDialogProps) {
  const { open, onClose, selectedChip } = props;
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(2);
  const [needBag, setNeedBag] = useState(true);
  const [cost, setCost] = useState(0);
  // const [selectedChipItem, setSelectedChipItem] = useState(0);
  const orderItems: OrderItem[] = [
    { name: 'Poke Ball', cost: 5 },
    { name: 'Great Ball', cost: 10 },
    { name: 'Super Potion', cost: 10 },
    { name: 'Hyper Potion', cost: 20 },
  ];

  useEffect(() => {
    updateCost();
  }, [selectedItem, quantity, needBag]);

  useEffect(() => {
    if (selectedChip) {
      const { item, quantity, bag } = selectedChip;
      setSelectedItem(item);
      setQuantity(quantity);
      setNeedBag(bag);
    }
    updateCost();
  }, [selectedChip]);

  const onQuantityChange = (event: Event, newValue: number | number[]) => {
    setQuantity(newValue as number);
  };

  const selectedItemChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };

  const needBagChange = () => {
    setNeedBag(!needBag);
  };

  const updateCost = () => {
    let selectedItemCost = orderItems.find(
      (item) => item.name === selectedItem
    )?.cost;
    setCost(
      selectedItemCost ? selectedItemCost * quantity + (needBag ? 2 : 0) : 0
    );
  };

  const closeOrderDialog = () => {
    onClose(
      selectedChip ? selectedChip.id : uuid(),
      selectedItem,
      quantity,
      needBag,
      cost
    );
  };

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
            onChange={selectedItemChange}
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
              <MenuItem value={item.name} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <CustomSlider
            valueLabelDisplay='auto'
            aria-label='slider'
            value={quantity}
            className='slider'
            min={1}
            max={10}
            onChange={onQuantityChange}
          />
          <span className='slider-description'>Select Quantity</span>

          <div className='bag-question-container'>
            <div className='bag-question'>I need a bag for that!</div>
            <CustomSwitch checked={needBag} onChange={needBagChange} />
          </div>

          <div className='cost-container'>
            <div className='cost-label'>Cost:</div>
            <div className='cost'>${cost}</div>
          </div>

          <CustomButton
            className='add-to-cart-button'
            onClick={closeOrderDialog}
          >
            ADD TO CART
          </CustomButton>
        </div>
      </Container>
    </Dialog>
  );
}

export default OrderForm;
