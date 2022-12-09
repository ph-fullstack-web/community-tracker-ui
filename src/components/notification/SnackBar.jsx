import {useNotificationContext} from 'contexts/notification/NotificationContext';

import {Snackbar, Alert} from '@mui/material';

const SnackBar = () => {
  const {state: notificationState, dispatch: notificationDispatch} =
    useNotificationContext();
  const {visible, type, message} = notificationState;

  const onClose = () => {
    notificationDispatch({type: 'RESET'});
  };

  return (
    <Snackbar open={visible} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
