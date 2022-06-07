import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useSwitchThemeContext from 'hooks/Theme/useSwitchThemeContext';

export default function SearchInput() {
  const { currentThemePalette } = useSwitchThemeContext();
  const inputStyle = {
    border: `2px solid ${currentThemePalette.main}`,
    borderRadius: 999,
  };

  return (
    <TextField
      fullWidth
      InputProps={{
        placeholder: 'Search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'black' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        ml: { xs: 1, sm: 0 },
        '& .MuiOutlinedInput-root': {
          '& > fieldset': inputStyle,
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': { ...inputStyle, borderWidth: 3 },
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': inputStyle,
        },
        input: {
          py: 0.75,
          px: 0,
          color: currentThemePalette.text,
        },
      }}
    />
  );
}
