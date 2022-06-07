import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
} from "@mui/material";
import useGetManagers from "hooks/People/useGetManagers";
import { useState } from "react";

const JOB_LEVELS = {
  COM_DIRECTOR: "Community Director",
  COM_MANAGER: "Community Manager",
  REG_SOL_ARCH: "Regional Solutions Architect",
  SOL_ARCH: "Solutions Architect",
  PR_DEVELOPER: "Principal Developer",
  LEAD_DEVELOPER: "Lead Developer",
  ASS_LEAD_DEVELOPER: "Associate Lead Developer",
  SENIOR_DEVELOPER: "Senior Developer",
  DEVELOPER: "Developer",
};

const WORK_STATE = {
  FIRST: "First Month",
  SECOND: "Second Month",
  THIRD: "Third Month",
  FOURTH: "Fourth Month",
  FIFTH: "Fifth Month",
  ONBOARDING: "Onboarding",
  REGULAR: "Regular",
};

const ResourcesForm = () => {
  const [resource, setResource] = useState({
    name: "",
    assignedTo: "",
    state: "",
    hiredDate: "",
    jobLevel: "",
    project: "",
    projectLead: "",
    tags: "",
  });

  const onChangeHandler = (event) => {
    setResource((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const { isLoading, data: communityManagers } = useGetManagers();

  return (
    <Box
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
      }}
    >
      <Grid container>
        <Grid id="inputs-grid" item lg={7} md={5} sm={12} xs={12}>
          <Grid container gap={2} item sm={12} md={12}>
            <Grid item xs={12} sm={12} md={6}>
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
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required
                fullWidth
                value={resource.hiredDate}
                name="hiredDate"
                onChange={(e) => onChangeHandler(e)}
                variant="outlined"
                id="name"
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
            <Grid item xs={12} sm={12} md={5}>
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
            <Grid item xs={12} sm={12} md={5}>
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
            <Grid item xs={12} sm={12} md={5}>
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
            <Grid item xs={12} sm={12} md={5}>
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
                ></Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container gap={2}>
            <Grid item xs={12} sm={12} md={5}>
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
                  label="Project"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                ></Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <FormControl
                sx={{
                  mt: 5,
                }}
                fullWidth
              >
                <InputLabel>Tags</InputLabel>
                <Select
                  name="tags"
                  required
                  value={resource.tags}
                  label="Tags"
                  onChange={(e) => onChangeHandler(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid id="checkbox-grid" item lg={5} md={3} sm={12} xs={12} sx={{

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />

            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />
            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />
            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />
            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />
            <FormControlLabel
              control={<Checkbox checked={true} onChange={() => {}} />}
              label="Active"
              align="center"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
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
