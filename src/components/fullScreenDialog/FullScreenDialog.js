import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Generator from '../generator/Generator';

import './fullScreenDialog.css';

const Transition = React.forwardRef(function Transition(
  props,
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
