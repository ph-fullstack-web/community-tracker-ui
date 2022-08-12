import { MenuItem, Grid, Box, Card, FormControlLabel } from "@mui/material";
import { FormSelect, FormTextField, FormSwitch } from "components";
import useGetManagers from "hooks/people/useGetManagers";
import useGetProjects from "hooks/projects/useGetProjects";
import useGetWorkState from "hooks/workstate/useGetWorkState";
import useGetJobLevel from "hooks/joblevel/useGetJobLevel";
import { useState, useEffect } from "react";
import AppButton from "components/common/AppButton";
import { useSwitchThemeContext, useGetSkills, usePostSkills } from "hooks";
import SaveIcon from "@mui/icons-material/Save";
import { AutocompleteInputChip } from "../../components/index.js";
import { useNotificationContext } from "contexts/notification/NotificationContext";

const ResourcesForm = ({ onSubmitHandler, isProcessing, resourcePerson }) => {
  const { currentThemePalette } = useSwitchThemeContext();
  const [resource, setResource] = useState({
    name: "",
    state: "",
    hiredDate: "",
    jobLevel: "",
    projectLead: "",
    project: "",
    email: "",
    cognizantId: "",
    isProbationary: true,
    skills: "",
  });
  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newValues, setNewValues] = useState([]);
  const { mutate: postSkillMutate } = usePostSkills();
  const { dispatch: notificationDispatch } = useNotificationContext();

  useEffect(() => {
    if (resourcePerson) {
      setResource(resourcePerson);
      setSelectedSkills(resourcePerson.skills.map((skill) => ({id: skill.id, label: skill.description})));
    }
  }, [resourcePerson]);

  const onChangeHandler = (event) => {
    setResource((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeBoolean = () => {
    setResource((prevState) => ({
      ...prevState,
      isProbationary: !resource.isProbationary
    }))
  };

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects();
  const { isLoading, data: communityManagers } = useGetManagers();
  const { data: workStateData, isLoading: isLoadingWorkState } = useGetWorkState();
  const { data: jobLevelData, isLoading: isLoadingJobLevel } = useGetJobLevel();
  const { data: skillsData, isLoading: getSkillsLoading } = useGetSkills();

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitHandler(resource);
  };

  const sortProjects = ((a, b) => {
    const projectA = a.project.toLowerCase();
    const projectB = b.project.toLowerCase();

    if (projectA < projectB) return -1;
    if (projectA > projectB) return 1;
    return 0;
  })

  useEffect(() => {
    if (!getSkillsLoading) {
      setOptions(
        skillsData?.map((skl, idx) => {
          return { id: skl.peopleskills_id, label: skl.peopleskills_desc };
        })
      );
    }
  }, [skillsData, getSkillsLoading]);

  useEffect(() => {
    if (newValues && newValues.length > 0) {
      const payload = {
        peopleskills_desc: newValues[0].label,
        is_active: true,
      };
      
      postSkillMutate(payload, {
        onSuccess: (response) => {
          notificationDispatch({
            type: 'NOTIFY',
            payload: {
              type: 'success',
              message: 'Skill has been added.'
            }
          });
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
      })
      setNewValues([])
    }
  }, [newValues, postSkillMutate, notificationDispatch]);

  useEffect(() => {
    setResource((prevState) => ({
      ...prevState,
      skills: selectedSkills.map(skill => skill.id).toString()
    }))
  }, [selectedSkills]);

  return (
    <Card
      sx={{
        padding: "4rem",
        marginBottom: "20px",
        backgroundColor: currentThemePalette.cardSecondary,
      }}
    >
      <Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          component={"form"}
          onSubmit={onSubmit}
        >
          <Grid
            sx={{ width: "100%" }}
            id="inputs-grid"
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              gap={5}
              item
              sm={12}
              md={12}
              lg={12}
              xs={12}
            >
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormTextField
                  required
                  fullWidth
                  value={resource.name}
                  name="name"
                  onChange={(e) => onChangeHandler(e)}
                  variant="outlined"
                  id="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormTextField
                  required
                  fullWidth
                  value={resource.email}
                  name="email"
                  onChange={(e) => onChangeHandler(e)}
                  variant="outlined"
                  id="email"
                  label="CSV Mail"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormTextField
                  required
                  fullWidth
                  value={resource.cognizantId}
                  name="cognizantId"
                  onChange={(e) => onChangeHandler(e)}
                  variant="outlined"
                  id="cognizantId"
                  label="Cognizant ID"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormSelect
                  FormControlProps={{
                    fullWidth: true,
                  }}
                  InputLabelChildren="Work State"
                  SelectProps={{
                    name: "state",
                    required: true,
                    value: resource.state,
                    label: "Work State",
                    onChange: onChangeHandler,
                  }}
                >
                  <MenuItem value="">Select Work State</MenuItem>
                  {!isLoadingWorkState &&
                    (workStateData || []).map((workstate) => {
                      return (
                        <MenuItem
                          key={workstate.work_state_id}
                          value={workstate.work_state_id}
                        >
                          {" "}
                          {workstate.work_state_desc}{" "}
                        </MenuItem>
                      );
                    })}
                </FormSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormSelect
                  FormControlProps={{
                    fullWidth: true,
                  }}
                  InputLabelChildren="Job Level"
                  SelectProps={{
                    name: "jobLevel",
                    required: true,
                    value: resource.jobLevel,
                    label: "Job Level",
                    onChange: onChangeHandler,
                  }}
                >
                  <MenuItem value="">Select Job Level</MenuItem>
                  {!isLoadingJobLevel &&
                    (jobLevelData || []).map((joblevel) => {
                      return (
                        <MenuItem
                          key={joblevel.job_level_id}
                          value={joblevel.job_level_id}
                        >
                          {" "}
                          {joblevel.job_level_desc}{" "}
                        </MenuItem>
                      );
                    })}
                </FormSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormTextField
                  required
                  fullWidth
                  value={resource.hiredDate}
                  name="hiredDate"
                  onChange={(e) => onChangeHandler(e)}
                  variant="outlined"
                  id="name"
                  label="Hired Date"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Hired Date"
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormSelect
                  FormControlProps={{
                    fullWidth: true,
                  }}
                  InputLabelChildren="Project Lead"
                  SelectProps={{
                    name: "projectLead",
                    required: true,
                    value: resource.projectLead,
                    label: "Project Lead",
                    onChange: onChangeHandler,
                  }}
                >
                  <MenuItem value="">Select Project Lead</MenuItem>
                  {!isLoading &&
                    (communityManagers || []).map((manager) => {
                      return (
                        <MenuItem
                          key={manager.people_id}
                          value={manager.people_id}
                        >
                          {" "}
                          {manager.full_name}{" "}
                        </MenuItem>
                      );
                    })}
                </FormSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <FormSelect
                  FormControlProps={{
                    fullWidth: true,
                  }}
                  InputLabelChildren="Project"
                  SelectProps={{
                    name: "project",
                    required: true,
                    value: resource.project,
                    defaultValue: "",
                    label: "Projects",
                    onChange: onChangeHandler,
                  }}
                >
                  <MenuItem value="">Select Project</MenuItem>
                  {!isLoadingProjects &&
                    (projectsData || [])
                      .sort(sortProjects)
                      .map((project) => {
                        return (
                          <MenuItem key={project.id} value={project.id}>
                            {project.project}
                          </MenuItem>
                        );
                      }
                    )}
                </FormSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={11} 
                  sx={{ padding: {
                    lg: "0 2.1rem",
                    // md: "0 1.5rem"
                  } }}>
                <AutocompleteInputChip
                  options={options}
                  setOptions={setOptions}
                  selectedValue={selectedSkills}
                  setSelectedValue={setSelectedSkills}
                  newValues={newValues}
                  setNewValues={setNewValues}
                  allowAdd
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} alignSelf="flex-start">
                <FormControlLabel
                  sx={{
                    color: currentThemePalette.text,
                  }}
                  value={resource.isProbationary}
                  control={
                    <FormSwitch
                      onChange={onChangeBoolean}
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 }
                      }}
                      checked={resource.isProbationary}
                      disabled={resourcePerson?.isProbationary === false}
                    />
                  }
                  label="Probitionary"
                /> 
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                lg={5}
                container
                justifyContent="flex-end"
              >
                <AppButton
                  disabled={isProcessing}
                  size="large"
                  sx={{
                    textTransform: "uppercase",
                    width: "10rem",
                    height: "4rem",
                    ml: { xs: 1, sm: 3 },
                  }}
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  save
                </AppButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ResourcesForm;
