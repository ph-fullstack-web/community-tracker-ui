import React from 'react';
import {FormTextField} from 'components';
import SearchIcon from '@mui/icons-material/Search';
import AppButton from 'components/common/AppButton.jsx';

const EmployeeSearch = ({handleSearchChange, handleSearchClick, search}) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormTextField
        sx={{width: 'calc(100% - 11rem)'}}
        placeholder="Search Employee"
        label="Search Employee"
        value={search}
        autoComplete="off"
        onChange={handleSearchChange}
      />
      <AppButton
        type="submit"
        variant={'contained'}
        sx={{width: 120, height: 50, mt: 0.5, ml: {xs: 1, sm: 3}}}
        startIcon={<SearchIcon />}
        onClick={handleSearchClick}
      >
        Search
      </AppButton>
    </form>
  );
};

export default EmployeeSearch;
