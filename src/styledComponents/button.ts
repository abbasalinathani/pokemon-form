import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

export const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: '#FFFFFF',
  backgroundColor: '#FE5454',
  '&:hover': {
    backgroundColor: '#FE5454',
  },
}));