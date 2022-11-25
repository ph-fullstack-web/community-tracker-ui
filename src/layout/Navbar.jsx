import {Box} from "@mui/material";
import Logo from "./Logo";
import {useGetPeopleBySearchCriteria, useToggle} from "hooks";
import {LoginModal, FormTextField, EmployeeListModal} from "components";

import SearchIcon from "@mui/icons-material/Search";
import AppButton from "components/common/AppButton.jsx";
import {useState} from "react";

const Navbar = () => {
  const [toggle, setToggle] = useToggle();
  const [search, setSearch] = useState("");
  const [openEmployeeListModal, setOpenEmployeeListModal] = useState(false);

  const {
    isLoading: isPeopleDataLoading,
    data: peopleData,
    isError: isPeopleDataError,
    error: peopleDataError,
    refetch,
  } = useGetPeopleBySearchCriteria(search);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
    <Box display="flex" justifyContent="space-between" flex={1}>
      <Logo />
      <Box pt={3}>
        <form onSubmit={e => e.preventDefault()}>
          <FormTextField
            sx={{width: {xs: "100%", lg: "50ch"}}}
            placeholder="Search Employee"
            label="Search Employee"
            value={search}
            autoComplete="off"
            onChange={handleSearchChange}
          />
          <AppButton
            type="submit"
            variant={"contained"}
            sx={{width: 150, height: 50, mt: 0.5, ml: {xs: 1, sm: 3}}}
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
          >
            Search
          </AppButton>
        </form>
      </Box>
      <EmployeeListModal
        open={openEmployeeListModal}
        onClose={handleCloseEmployeeListModal}
        isLoading={isPeopleDataLoading}
        isError={isPeopleDataError}
        employees={peopleData}
        error={peopleDataError}
      />
      <LoginModal open={toggle} handleClose={handleToggle} />
    </Box>
  );
};

Navbar.propTypes = {};

export default Navbar;
