import {useState} from "react";
import {Grid} from "@mui/material";

import Logo from "./Logo";
import EmployeeSearch from "./EmployeeSearch";

import {useGetPeopleBySearchCriteria} from "hooks";
import {EmployeeListModal} from "components";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [openEmployeeListModal, setOpenEmployeeListModal] = useState(false);

  const {
    isLoading: isPeopleDataLoading,
    data: peopleData,
    isError: isPeopleDataError,
    error: peopleDataError,
    refetch,
  } = useGetPeopleBySearchCriteria(search);

  const handleSearchClick = () => {
    refetch();
    setOpenEmployeeListModal(true);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleCloseEmployeeListModal = () => {
    setOpenEmployeeListModal(false);
  };

  return (
    <Grid container spacing={3} mt={1} mb={4} mx={1}>
      <Grid xs={12} md={7}>
        <Logo />
      </Grid>
      <Grid xs={12} md={5} sx={{ mt: { xs: 4 }}}>
        <EmployeeSearch 
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
          search={search}
        />
      </Grid>      
      <EmployeeListModal
        open={openEmployeeListModal}
        onClose={handleCloseEmployeeListModal}
        isLoading={isPeopleDataLoading}
        isError={isPeopleDataError}
        employees={peopleData}
        error={peopleDataError}
      />
    </Grid>
  );
};

Navbar.propTypes = {};

export default Navbar;
