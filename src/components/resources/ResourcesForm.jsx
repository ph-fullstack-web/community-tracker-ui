import { MenuItem, Grid, Box, Card } from "@mui/material";
import { FormSelect, FormTextField } from "components";
import useGetManagers from "hooks/people/useGetManagers";
import useGetProjects from "hooks/projects/useGetProjects";
import { JOB_LEVELS, WORK_STATES } from "utils/constants";
import { useState, useEffect } from "react";
import AppButton from "components/common/AppButton";
import { useSwitchThemeContext } from "hooks";
import SaveIcon from "@mui/icons-material/Save";

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
  });

  useEffect(() => {
    if (resourcePerson) {
      setResource(resourcePerson);
    }
  }, [resourcePerson]);

  const onChangeHandler = (event) => {
    setResource((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects();
  const { isLoading, data: communityManagers } = useGetManagers();

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitHandler(resource);
  };

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
                  {Object.keys(WORK_STATES).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {WORK_STATES[key]}
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
                  {Object.keys(JOB_LEVELS).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {JOB_LEVELS[key]}
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
                    (projectsData || []).map((project) => {
                      return (
                        <MenuItem key={project.id} value={project.id}>
                          {project.name}
                        </MenuItem>
                      );
                    })}
                </FormSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
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
