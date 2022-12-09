import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from '@mui/material';

import {FormTextField, FormSwitch} from 'components';
import {useSwitchThemeContext} from 'hooks';
import AppButton from 'components/common/AppButton';

export const SkillFormModal = ({open, skillProp, onConfirm, onCancel}) => {
  const [skill, setSkill] = useState({
    peopleskills_desc: '',
    is_active: true,
  });
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  const handleUpdate = () => onConfirm(skill);
  const handleCancel = () => onCancel();

  const onChangeHandler = event => {
    setSkill(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeBoolean = () => {
    setSkill(prevState => ({
      ...prevState,
      is_active: !skill.is_active,
    }));
  };

  useEffect(() => {
    if (skillProp) {
      setSkill(skillProp);
    }
  }, [skillProp]);

  if (!skill) return <></>;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperProps={{
        sx: {
          backgroundColor: currentTheme === 'dark' ? '#202124' : null,
          border:
            currentTheme === 'dark'
              ? `2px solid ${currentThemePalette.light}`
              : null,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: currentThemePalette.text,
          backgroundColor:
            currentTheme === 'dark' ? currentThemePalette.medium : '#FFFFFF',
        }}
      >
        Update skill
      </DialogTitle>
      <DialogContent>
        <FormTextField
          fullWidth
          value={skill.peopleskills_desc}
          name="peopleskills_desc"
          onChange={e => onChangeHandler(e)}
          variant="outlined"
          id="peopleskills_desc"
          label="Description"
          sx={{marginTop: '1rem'}}
        />
        <FormControlLabel
          sx={{
            color: currentThemePalette.text,
          }}
          value={skill.is_active}
          control={
            <FormSwitch
              onChange={onChangeBoolean}
              sx={{
                '& .MuiSvgIcon-root': {fontSize: 28},
              }}
              checked={skill.is_active}
            />
          }
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleCancel}>Cancel</AppButton>
        <AppButton onClick={handleUpdate}>Update</AppButton>
      </DialogActions>
    </Dialog>
  );
};
