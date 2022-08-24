import { withStyles } from '@mui/styles';
import { Menu,MenuItem } from '@mui/material';
import React from 'react';

export const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      backgroundColor:'rgba(20,37,50,0.4)',
      borderRadius:"10px"
    },
  })((props) => (
    <Menu
    elevation={0}
      {...props}
    />
  ));;

export const StyledMenuItem = withStyles((theme) => ({
    root: {
        color:'white',
        '&:hover':{color:'#000000',backgroundColor:'#ffffff'},
    }
  }))(MenuItem);