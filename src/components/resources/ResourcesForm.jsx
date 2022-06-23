import { MenuItem, Grid, Box } from "@mui/material";
import useGetManagers from "hooks/people/useGetManagers";
import useGetProjects from "hooks/projects/useGetProjects";
import { JOB_LEVELS, WORK_STATES } from "utils/constants";
import { useState, useEffect } from "react";
import ResourcesTextField from "./ResourcesTextField";
import ResourcesSelect from "./ResourcesSelect";
import ResourcesSaveButton from "./ResourcesSaveButton";
import ResourcesCheckboxes from "./ResourcesCheckboxes";

const ResourcesContainer = ({ children, ...otherProps }) => {
  return (
    <Grid container gap={2} {...otherProps}>
      {children}
    </Grid>
  );
};

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
      }}>
      <Grid container component={"form"} onSubmit={onSubmit}>
        <Grid id="inputs-grid" item lg={5} md={12} sm={12} xs={12}>
          <ResourcesContainer item sm={12} md={12} lg={12}>
            <ResourcesTextField
              gridMd={10}
              gridLg={10}
              value={resource.name}
              name="name"
              id="name"
              label="Name"
              onChange={(e) => onChangeHandler(e)}
            />
            <ResourcesTextField
              value={resource.email}
              name="email"
              id="email"
              label="CSV Mail"
              onChange={(e) => onChangeHandler(e)}
            />
            <ResourcesTextField
              value={resource.cognizantId}
              name="cognizantId"
              id="cognizantId"
              label="Cognizant ID"
              onChange={(e) => onChangeHandler(e)}
            />
          </ResourcesContainer>

          <ResourcesContainer item sm={12} md={12} lg={12}>
            <ResourcesSelect
              value={resource.state}
              name="state"
              label="Work State"
              onChange={(e) => onChangeHandler(e)}>
              {Object.keys(WORK_STATES).map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {WORK_STATES[key]}
                  </MenuItem>
                );
              })}
            </ResourcesSelect>
            <ResourcesSelect
              value={resource.jobLevel}
              name="jobLevel"
              label="Job Level"
              onChange={(e) => onChangeHandler(e)}>
              {Object.keys(JOB_LEVELS).map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {JOB_LEVELS[key]}
                  </MenuItem>
                );
              })}
            </ResourcesSelect>
          </ResourcesContainer>

          <ResourcesContainer>
            <ResourcesSelect
              value={resource.assignedTo}
              name="assignedTo"
              label="Assigned To"
              onChange={(e) => onChangeHandler(e)}>
              <MenuItem value="">Select Community Manager</MenuItem>
              {!isLoading &&
                (communityManagers || []).map((manager) => {
                  return (
                    <MenuItem key={manager.people_id} value={manager.people_id}>
                      {" "}
                      {manager.full_name}{" "}
                    </MenuItem>
                  );
                })}
            </ResourcesSelect>
            <ResourcesTextField
              value={resource.hiredDate}
              name="hiredDate"
              id="hiredDate"
              label="Hired Date"
              placeholder="Hired Date"
              dateType
              onChange={(e) => onChangeHandler(e)}
            />
          </ResourcesContainer>

          <ResourcesContainer>
            <ResourcesSelect
              value={resource.project}
              name="project"
              label="Project"
              defaultValue=""
              onChange={(e) => onChangeHandler(e)}>
              <MenuItem value="">Select Project</MenuItem>
              {!isLoadingProjects &&
                (projectsData || []).map((project) => {
                  return (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  );
                })}
            </ResourcesSelect>
            <ResourcesSelect
              value={resource.projectLead}
              name="projectLead"
              label="Project Lead"
              defaultValue=""
              onChange={(e) => onChangeHandler(e)}>
              <MenuItem value="">Select Project Lead</MenuItem>
              {!isLoading &&
                (communityManagers || []).map((manager) => {
                  return (
                    <MenuItem key={manager.people_id} value={manager.people_id}>
                      {" "}
                      {manager.full_name}{" "}
                    </MenuItem>
                  );
                })}
            </ResourcesSelect>
          </ResourcesContainer>
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
          }}>
          <ResourcesCheckboxes />
          <ResourcesSaveButton isProcessing={isProcessing} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesForm;
