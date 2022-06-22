import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Grid,
  Box,
} from "@mui/material";
import useGetManagers from "hooks/people/useGetManagers"
import useGetProjects from "hooks/projects/useGetProjects";
import { useState, useEffect } from "react";

const JOB_LEVELS = {
  1: "Community Director",
  2: "Community Manager",
  3: "Regional Solutions Architect",
  4: "Solutions Architect",
  5: "Principal Developer",
  6: "Lead Developer",
  7: "Associate Lead Developer",
  8: "Senior Developer",
  9: "Developer",
};

const WORK_STATE = {
  1: "First Month",
  2: "Second Month",
  3: "Third Month",
  4: "Fourth Month",
  5: "Fifth Month",
  6: "Onboarding",
  7: "Regular",
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
    cognizantId: ""
  });

  useEffect(() => {
    if (resourcePerson) {
      setResource((resourcePerson))
    }
  }, [resourcePerson])

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
    onSubmitHandler(resource)
  }

  return (
    <Box
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
      }}
    >
      <Grid container component={'form'} onSubmit={onSubmit} >
        <Grid id="inputs-grid" item lg={5} md={12} sm={12} xs={12}>
          <Grid container gap={2} item sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <TextField
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
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <TextField
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
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <TextField
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
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>

          </Grid>

          <Grid container gap={2} item sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Work State</InputLabel>
                <Select
                  name="state"
                  required
                  value={resource.state}
                  label="Work State"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {Object.keys(WORK_STATE).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {WORK_STATE[key]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Job Level</InputLabel>
                <Select
                  name="jobLevel"
                  required
                  value={resource.jobLevel}
                  label="Job Level"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {Object.keys(JOB_LEVELS).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {JOB_LEVELS[key]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          <Grid container gap={2}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Assigned To</InputLabel>
                <Select
                  name="assignedTo"
                  required
                  value={resource.assignedTo}
                  label="Assigned To"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <TextField
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
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
          </Grid>

          <Grid container gap={2}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Project</InputLabel>
                <Select
                  name="project"
                  required
                  value={resource.project}
                  defaultValue=""
                  label="Projects"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <MenuItem value="">Select Project</MenuItem>
                  {!isLoadingProjects &&
                    (projectsData || []).map((project) => {
                      return (
                        <MenuItem
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Project Lead</InputLabel>
                <Select
                  name="projectLead"
                  required
                  value={resource.projectLead}
                  label="Project Lead"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
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
                </Select>
              </FormControl>

            </Grid>
          </Grid>
        </Grid>

        <Grid id="checkbox-grid" item lg={5} md={3} sm={12} xs={12} sx={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Grid item sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}>
            {/* Put checkboxes here */}
          </Grid>
          <Grid item sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Button
              variant="contained"
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
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesForm;
