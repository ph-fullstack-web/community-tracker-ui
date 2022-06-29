import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
import useGetManagers from "hooks/people/useGetManagers";
import { JOB_LEVELS, WORK_STATES } from "utils/constants";
import { useState, useEffect } from "react";
import CustomButton from "components/common/CustomButton";

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

  const { isLoading, data: communityManagers } = useGetManagers();

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitHandler(resource);
  };

  return (
    <Box display="flex" flexDirection="column" alignSelf="center" >
      <Grid justifyContent="center" display="flex" alignItems="center" container component={"form"} onSubmit={onSubmit}>
        <Grid item lg={5} md={12} sm={12} xs={12}>
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
          <Box display="flex" gap={2} justifyContent="space-between" marginY={2}>
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

                backgroundColor: "#FFFFFF",
              }}
            />
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
                backgroundColor: "#FFFFFF",
              }}
            />

          </Box>
          <Box display="flex" gap={2} justifyContent="space-between" marginY={2}>
            <FormControl
              fullWidth>
              <InputLabel>Work State</InputLabel>
              <Select
                name="state"
                required
                value={resource.state}
                label="Work State"
                onChange={(e) => onChangeHandler(e)}
                sx={{
                  backgroundColor: "#FFFFFF",
                }}>
                {Object.keys(WORK_STATES).map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {WORK_STATES[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              fullWidth>
              <InputLabel>Job Level</InputLabel>
              <Select
                name="jobLevel"
                required
                value={resource.jobLevel}
                label="Job Level"
                onChange={(e) => onChangeHandler(e)}
                sx={{
                  backgroundColor: "#FFFFFF",
                }}>
                {Object.keys(JOB_LEVELS).map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {JOB_LEVELS[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" gap={2} justifyContent="space-between" marginY={2}>
            <FormControl
              fullWidth>
              <InputLabel>Project Lead</InputLabel>
              <Select
                name="projectLead"
                required
                value={resource.projectLead}
                label="Project Lead"
                onChange={(e) => onChangeHandler(e)}
                sx={{
                  backgroundColor: "#FFFFFF",
                }}>
                <MenuItem value="">Select Project Lead</MenuItem>
                {!isLoading &&
                  (communityManagers || []).map((manager) => {
                    return (
                      <MenuItem
                        key={manager.people_id}
                        value={manager.people_id}>
                        {" "}
                        {manager.full_name}{" "}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
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

                backgroundColor: "#FFFFFF",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <CustomButton display="flex" alignSelf="center" disabled={isProcessing} variant="contained" size="large" type="submit" width="10rem" name="save" />

    </Box>
  );
};

export default ResourcesForm;
