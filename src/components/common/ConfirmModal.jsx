import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => onConfirm();
  const handleCancel = () => onCancel();

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelButtonText}</Button>
        <Button onClick={handleConfirm}>{confirmButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
