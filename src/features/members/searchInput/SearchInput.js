import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  const inputStyle = { border: '1px solid black', borderRadius: 999 };

  return (
    <TextField
      InputProps={{
        placeholder: 'Search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'black' }} />
          </InputAdornment>
        ),
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
