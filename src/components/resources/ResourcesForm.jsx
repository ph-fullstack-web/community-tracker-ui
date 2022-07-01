import { MenuItem, Grid, Box } from "@mui/material";
import { FormSelect, FormTextField } from "components";
import useGetManagers from "hooks/people/useGetManagers";
import useGetProjects from "hooks/projects/useGetProjects";
import { JOB_LEVELS, WORK_STATES } from "utils/constants";
import { useState, useEffect } from "react";
import AppButton from "components/common/AppButton";

const ResourcesForm = ({ onSubmitHandler, isProcessing, resourcePerson }) => {
  const [resource, setResource] = useState({
    name: "",
    assignedTo: "",
    state: "",
    hiredDate: "",
    jobLevel: "",
    project: "",
    projectLead: "",
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
    <Box
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
      }}
    >
      <Grid container component={"form"} onSubmit={onSubmit}>
        <Grid id="inputs-grid" item lg={5} md={12} sm={12} xs={12}>
          <Grid container gap={2} item sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <FormTextField
                required
                fullWidth
                value={resource.name}
                name="name"
                onChange={(e) => onChangeHandler(e)}
                variant="outlined"
                id="name"
                label="Name"
                sx={{
                  mt: 5,
                }}
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
                sx={{
                  mt: 5,
                }}
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
                sx={{
                  mt: 5,
                }}
              />
            </Grid>
          </Grid>

          <Grid container gap={2} item sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormSelect
                FormControlProps={{
                  sx: {
                    mt: 5,
                  },
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
                  sx: {
                    mt: 5,
                  },
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
          </Grid>

          <Grid container gap={2}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormSelect
                FormControlProps={{
                  sx: {
                    mt: 5,
                  },
                  fullWidth: true,
                }}
                InputLabelChildren="Assigned To"
                SelectProps={{
                  name: "assignedTo",
                  required: true,
                  value: resource.assignedTo,
                  label: "Assigned To",
                  onChange: onChangeHandler,
                }}
              >
                <MenuItem value="">Select Community Manager</MenuItem>
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
              <FormTextField
                required
                fullWidth
                value={resource.hiredDate}
                name="hiredDate"
                onChange={(e) => onChangeHandler(e)}
                variant="outlined"
                id="name"
                label="Hired Date"
                placeholder="Hired Date"
                type="date"
                sx={{
                  mt: 5,
                }}
              />
            </Grid>
          </Grid>

          <Grid container gap={2}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormSelect
                FormControlProps={{
                  sx: {
                    mt: 5,
                  },
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
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormSelect
                FormControlProps={{
                  sx: {
                    mt: 5,
                  },
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
          </Grid>
        </Grid>

        <Grid
          id="checkbox-grid"
          item
          lg={5}
          md={3}
          sm={12}
          xs={12}
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            {/* Put checkboxes here */}
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AppButton
              disabled={isProcessing}
              size="large"
              sx={{
                textTransform: "uppercase",
                width: "10rem",
                height: "4rem",
              }}
              type="submit"
            >
              save
            </AppButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesForm;
