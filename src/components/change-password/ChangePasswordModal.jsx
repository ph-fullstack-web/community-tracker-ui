import React, {useState, useEffect} from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import * as Yup from 'yup';

import { FormTextField } from "components";
import { useAuthContext } from "contexts/auth/AuthContext";
import { useUpdatePassword } from 'hooks';
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useSwitchThemeContext } from "hooks";

export const ChangePasswordModal = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  let schema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().required("New password is required")
      .test('passwords-do-not-match', 'Must not match current password', function(value){
        return this.parent.currentPassword !== value
      }),
    confirmNewPassword: Yup.string().required("Confirm new password is required")
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.newPassword === value
      })    
  });
  
  const {state} = useAuthContext();
  const { mutate: updatePasswordMutate } = useUpdatePassword();
  const { dispatch: notificationDispatch } = useNotificationContext();

  const handleUpdate = () => {
    schema.validate(password, {abortEarly: false})
      .then(_ => updatePassword())
      .catch(err => {
        const errors = err.inner.map(error => ({
          path: error.path,
          errorMessage: error.errors[0],
        }));
        setErrors(errors);
      });
  };
  const handleCancel = () => onCancel();
  const handleShowCurrentPasswordClick = () => setShowCurrentPassword(prev => !prev);
  const handleShowNewPasswordClick = () => setShowNewPassword(prev => !prev);
  const handleShowConfirmNewPasswordClick = () => setShowConfirmNewPassword(prev => !prev);
  const handleMouseDownPassword = (event => event.preventDefault());

  const updatePassword = () => {
    const args = {
      communityAdminAndManagerId: Object.keys(state.credentials).length !== 0 ? 
                  state.credentials.communityadminandmanagerid : 2, // Hardcoded for now. Login not implemented
      payload: {
        password: password.currentPassword,
        newPassword: password.newPassword,
      },
    }
    updatePasswordMutate(args, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Password has been updated.'
          }
        });
        onConfirm(password);
      },
      onError: (error) => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message
          }
        });
      }
    });
  };

  const onChangeHandler = (event) => {
    setPassword((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if(open) {
      setErrors([]);
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmNewPassword(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleCancel}>
        <DialogTitle sx={{
          color: currentThemePalette.text,
          backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
        }}>Change password</DialogTitle>
        <DialogContent sx={{
          backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
        }}>
          <FormTextField
            fullWidth
            value={password.currentPassword}
            name="currentPassword"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="currentPassword"
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            sx={{marginTop: "1rem"}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowCurrentPasswordClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.some(error => error.path === "currentPassword")}
            helperText={
              errors.some(error => error.path === "currentPassword") ? 
              errors.find(error => error.path === "currentPassword").errorMessage : ""
            }
          />
          <FormTextField
            fullWidth
            value={password.newPassword}
            name="newPassword"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="newPassword"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            sx={{marginTop: "1rem"}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowNewPasswordClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.some(error => error.path === "newPassword")}
            helperText={
              errors.some(error => error.path === "newPassword") ? 
              errors.find(error => error.path === "newPassword").errorMessage : ""
            }
          />
          <FormTextField
            fullWidth
            value={password.confirmNewPassword}
            name="confirmNewPassword"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="confirmNewPassword"
            label="Confirm New Password"
            type={showConfirmNewPassword ? "text" : "password"}
            sx={{marginTop: "1rem"}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowConfirmNewPasswordClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.some(error => error.path === "confirmNewPassword")}
            helperText={
              errors.some(error => error.path === "confirmNewPassword") ? 
              errors.find(error => error.path === "confirmNewPassword").errorMessage : ""
            }
          />
        </DialogContent>
        <DialogActions sx={{
          backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
        }}>
          <Button 
            sx={{color: currentTheme === "dark" ? currentThemePalette.light : currentThemePalette.dark}} 
            onClick={handleCancel}
          >
              Cancel
          </Button>
          <Button 
            sx={{color: currentTheme === "dark" ? currentThemePalette.light : currentThemePalette.dark}} 
            onClick={handleUpdate}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
  )
};

export default ChangePasswordModal;
