import React from 'react';
import IconButton from '@mui/material/IconButton';
import { InfoSharp } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    close_icon: {
        padding:"0px"
    },
});

const DetailButton = (props) => {
      const classes = useStyles();
      return(
        <IconButton {...props} classes={{ root: classes.close_icon }}>
          <InfoSharp fontSize="medium" />
        </IconButton>
  )};

export default DetailButton;