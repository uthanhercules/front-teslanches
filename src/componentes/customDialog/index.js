import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

import './styles.css';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({
  btClassName, btAbrirMensagem, conteudo, recarregarPag
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={`${btClassName} mt2rem`} type="button" onClick={handleClickOpen}>
        {btAbrirMensagem}
      </button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

        <DialogContent dividers>
          {conteudo}
          <button id="btCancelar" className="btTransparente" type="button" onClick={handleClose}>cancelar</button>
        </DialogContent>

      </Dialog>
    </div>
  );
}
