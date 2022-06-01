//import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

// const CssTextField = styled(TextField)({
//   borderColor: 'black',
// });

export default function SearchInput() {
  const inputStyle = { border: '2px solid black', borderRadius: 999 };

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
          //border: '2px solid black',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& > fieldset': inputStyle,
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': inputStyle,
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': inputStyle,
        },
        input: {
          py: 0.75,
          px: 0,
          width: '55ch',
        },
      }}
    />
  );
}
