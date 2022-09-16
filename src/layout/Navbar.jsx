import { Box } from '@mui/material';
import Logo from './Logo';
import { useGetPeopleBySearchCriteria, useToggle } from 'hooks';
import { LoginModal, FormTextField } from 'components';

import SearchIcon from "@mui/icons-material/Search";
import AppButton from "components/common/AppButton.jsx";
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [toggle, setToggle] = useToggle();
  const [search, setSearch] = useState('');

  const {
    // isLoading,
    data: peopleData,
    // isError,
    // error,
    refetch,
  } = useGetPeopleBySearchCriteria(search);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSearchClick = () => {
    console.log(search);
    refetch();
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    console.log(peopleData)
  }, [peopleData])

  return (
    <Box display="flex" justifyContent="space-between" flex={1}>
      <Logo />
      <Box pt={3}>
        <FormTextField 
          sx={{width: {xs:"100%", lg: "50ch"}}} 
          placeholder="Search Employee"
          label="Search Employee"
          value={search}
          autoComplete="off"
          onChange={handleSearchChange}
        />
        <AppButton
          variant={"contained"}
          sx={{ width: 150, height: 50, ml: { xs: 1, sm: 3 } }}
          startIcon={<SearchIcon />}
          onClick={handleSearchClick}
        >
          Search
        </AppButton>
      </Box>
      <LoginModal open={toggle} handleClose={handleToggle} />
    </Box>
  );
};

Navbar.propTypes = {};

export default Navbar;
