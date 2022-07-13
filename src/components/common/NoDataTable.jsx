import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { useSwitchThemeContext } from "hooks";

const NoDataTable = ({ columns }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const tableCellStyle = {
    border: `2px solid ${
      currentTheme === "dark"
        ? currentThemePalette.light
        : currentThemePalette.border
    }`,
    p: 1,
    color: currentThemePalette.text,
  };
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table sx={{ mt: 3, mb: 0.5, mx: { xs: 1, sm: 0 }, minWidth: 825 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.value}
                align="center"
                sx={{
                  ...tableCellStyle,
                  fontWeight: "bold",
                  backgroundColor:
                    currentTheme === "dark"
                      ? currentThemePalette.dark
                      : currentThemePalette.medium,
                }}
              >
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              align="center"
              colSpan={6}
              sx={{ ...tableCellStyle, py: 2.5 }}
            >
              {"Select a Skills to search for members"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default NoDataTable;
