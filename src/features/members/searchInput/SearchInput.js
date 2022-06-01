//import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

// const CssTextField = styled(TextField)({
//   borderColor: 'black',
// });

export default function SearchInput() {
  return (
    <TextField
      InputProps={{
        placeholder: 'Search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'black' }} />
          </InputAdornment>
        ),
        style: {
          borderRadius: 999,
          border: '2px solid black',
        },
      }}
      sx={{
        input: {
          py: 0.5,
          px: 0,
        },
      }}
    />
  );
}
