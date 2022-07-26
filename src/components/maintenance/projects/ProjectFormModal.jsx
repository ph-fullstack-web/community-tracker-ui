import React, {useEffect, useState} from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  FormControlLabel,
} from '@mui/material';

import { FormTextField, FormSwitch } from "components";
import { useSwitchThemeContext } from "hooks";

export const ProjectFormModal = ({
  open,
  skillProp,
  onConfirm,
  onCancel,
}) => {
  const [skill, setSkill] = useState({
    peopleskills_desc: "",
    is_active: true
  });
  const { currentThemePalette } = useSwitchThemeContext();

  const handleUpdate = () => onConfirm(skill);
  const handleCancel = () => onCancel();

  const onChangeHandler = (event) => {
    setSkill((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeBoolean = () => {
    setSkill((prevState) => ({
      ...prevState,
      is_active: !skill.is_active
    }))
  };

  
  useEffect(() => {
    if (skillProp) {
      setSkill(skillProp);
    }
  }, [skillProp]);
  

  if (!skill) return <></>;

  return (
    <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Update Skill</DialogTitle>
        <DialogContent>
          <FormTextField
            fullWidth
            value={skill.peopleskills_desc}
            name="peopleskills_desc"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="peopleskills_desc"
            label="Description"
            sx={{marginTop: "1rem"}}
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
                  '& .MuiSvgIcon-root': { fontSize: 28 }
                }}
                checked={skill.is_active}
              />
            }
            label="Active"
          /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
  )
};
