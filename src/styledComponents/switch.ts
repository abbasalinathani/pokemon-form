import styled from "@emotion/styled";
import { Switch, alpha } from "@mui/material";

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FE5454',
    '&:hover': {
      backgroundColor: alpha('#FE5454', 0),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FE5454',
  },
}));