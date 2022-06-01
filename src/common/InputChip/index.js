import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TextField from '@mui/material/TextField';

/* for typescript only
interface ChipData {
  key: number;
  label: string;
}
*/

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handlePressEnter = (value) => {
    setChipData([...chipData, { key: chipData.length, label: value }]);
  };

  return (
    <Box noValidate autoComplete="on">
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData.map((data) => {
          let icon;

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
      <TextField
        id="chip-text-input"
        label="Skills"
        variant="standard"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handlePressEnter(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </Box>
  );
}
