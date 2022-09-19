import React, {useEffect, useState} from 'react';
import {
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  FormControlLabel,
} from '@mui/material';

import { FormTextField, FormSwitch } from "components";
import { useSwitchThemeContext } from "hooks";
import AppButton from 'components/common/AppButton';

export const ProjectFormModal = ({
  open,
  projectProp,
  onConfirm,
  onCancel,
}) => {
  const [project, setProject] = useState({
    name: "",
    code: "",
    is_active: true
  });
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  const handleConfirm = () => onConfirm(project);
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
  
  useEffect(() => {
    if (!projectProp)
      setProject({
        name: "",
        is_active: true,
      })
    else setProject(projectProp);
  }, [open, projectProp])

  if (!project) return <></>;

  return (
    <Dialog
      open={open} 
      onClose={handleCancel}
      PaperProps={{
        sx:{
          backgroundColor: currentTheme === "dark" ? "#202124" : null,
          border: currentTheme === "dark" ? `2px solid ${currentThemePalette.light}` : null
        }
      }}
    >
        <DialogTitle
          sx={{
            color: currentThemePalette.text,
            backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
          }}
        >
          {projectProp ? 'Update' : 'Add'} project
        </DialogTitle>
        <DialogContent>
          <FormTextField
            autoComplete="off"
            fullWidth
            required
            value={project.name}
            name="name"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="name"
            label="Name"
            sx={{marginTop: "1rem"}}
          />
          <FormTextField
            autoComplete="off"
            fullWidth
            required
            value={project.code}
            name="code"
            onChange={(e) => onChangeHandler(e)}
            variant="outlined"
            id="code"
            label="Code"
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
          <AppButton onClick={handleCancel}>Cancel</AppButton>
          <AppButton disabled={!project.name} onClick={handleConfirm}>{projectProp ? 'Update' : 'Add'}</AppButton>
        </DialogActions>
      </Dialog>
  )
};
