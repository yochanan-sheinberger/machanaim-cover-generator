import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Generator from '../generator/Genrator';

import './fullScreenDialog.css';

const Transition = React.forwardRef(function Transition(
  props, {
    children,
  },
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {


  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        TransitionComponent={Transition}
      >
        <Generator {...props} />
      </Dialog>
    </div>
  );
}
