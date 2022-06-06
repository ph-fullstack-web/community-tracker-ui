import { useContext } from 'react';
import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersMainContainer from './MembersMainContainer';

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

const Members = () => {
  const { currentTheme, setAndStoreCurrentTheme } =
    useContext(SwitchThemeContext);

  const handleChange = event => {
    setAndStoreCurrentTheme(event.target.value);
  };

  return (
    <PageContainer>
      <Logo />

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Theme</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="blue"
          name="radio-buttons-group"
          row
          onChange={handleChange}>
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="plum" control={<Radio />} label="Plum" />
          <FormControlLabel value="teal" control={<Radio />} label="Teal" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h5" gutterBottom component="div">
        {currentTheme}
      </Typography>

      <PageTitle title="Resource Details Page." />

      <MembersMainContainer />
    </PageContainer>
  );
};

export default Members;
