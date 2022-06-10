import { Container, Dialog } from '@mui/material';
import { CustomButton } from '../../styledComponents/button';
import { CartItem } from '../Form/Form';
import './Summary.scss';

export interface SummaryDialogProps {
  open: boolean;
  fullName: string;
  codeName: string;
  range: number;
  region: string;
  pokemon: string;
  items: CartItem[];
  totalCost: number;
  onClose: () => void;
}

function Summary(props: SummaryDialogProps) {
  const {
    open,
    fullName,
    codeName,
    range,
    region,
    pokemon,
    items,
    totalCost,
    onClose,
  } = props;

  const closeSummaryDialog = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <Container className='container'>
        <div className='data'>
          <div className='label'>Full Name:</div>
          <div className='value'>{fullName}</div>
        </div>
        <div className='data'>
          <div className='label'>Code Name:</div>
          <div className='value'>{codeName}</div>
        </div>
        <div className='data'>
          <div className='label'>Range:</div>
          <div className='value'>{range} KM(s)</div>
        </div>
        <div className='data'>
          <div className='label'>Region:</div>
          <div className='value'>{region}</div>
        </div>
        <div className='data'>
          <div className='label'>Pokemon:</div>
          <div className='value'>{pokemon}</div>
        </div>
        <div className='items-container'>
          <div className='label'>Items:</div>
          {items.map((item) => (
            <div className='item' key={item.id}>
              <div className='item-name'>
                {item.item} x{item.quantity} {item.bag ? '(with bag)' : ''}
              </div>
              <div className='item-cost'>${item.cost}</div>
            </div>
          ))}
        </div>
        <div className='cost-container'>
          <div className='cost-label'>Total Cost</div>
          <div className='cost'>${totalCost}</div>
        </div>
        <CustomButton className='finish-button' onClick={closeSummaryDialog}>
          CLOSE
        </CustomButton>
      </Container>
    </Dialog>
  );
}

export default Summary;
