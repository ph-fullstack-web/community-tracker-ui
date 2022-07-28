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
    borderBottom: "none",
    p: 1.7,
    color: currentThemePalette.text,
  };
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table
        sx={{
          mt: 3,
          mb: 0.5,
          mx: { xs: 1, sm: 0 },
          minWidth: 825,
          borderCollapse: "separate",
          borderSpacing: "0px 8px",
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.value}
                sx={{
                  ...tableCellStyle,
                  fontWeight: "550",
                  borderBottom: "none",
                  backgroundColor: currentThemePalette.opacityBackground,
                  fontSize: "13px",
                }}
              >
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              backgroundColor:
                currentTheme === "dark"
                  ? currentThemePalette.medium
                  : "#FFFFFF",
            }}
          >
            <TableCell
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
