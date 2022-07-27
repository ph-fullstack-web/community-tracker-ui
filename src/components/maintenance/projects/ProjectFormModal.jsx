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
  projectProp,
  onConfirm,
  onCancel,
}) => {
  const [project, setProject] = useState({
    name: "",
    is_active: true
  });
  const { currentThemePalette } = useSwitchThemeContext();

  const handleUpdate = () => onConfirm(project);
  const handleCancel = () => onCancel();

  const onChangeHandler = (event) => {
    setProject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeBoolean = () => {
    setProject((prevState) => ({
      ...prevState,
      is_active: !project.is_active
    }))
  };

  
  useEffect(() => {
    if (projectProp) {
      setProject(projectProp);
    }
  }, [projectProp]);
  

  if (!project) return <></>;

  return (
    <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Update project</DialogTitle>
        <DialogContent>
          <FormTextField
            fullWidth
            value={project.name}
            name="name"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="name"
            label="Name"
            sx={{marginTop: "1rem"}}
          />
          <FormControlLabel
            sx={{
              color: currentThemePalette.text,
            }}
            value={project.is_active}
            control={
              <FormSwitch
                onChange={onChangeBoolean}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 }
                }}
                checked={project.is_active}
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
