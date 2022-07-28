import React, { useState, useEffect } from "react";
import {
  Box,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
} from "@mui/material";
import { MEMBERS_TABLE_SKILLS } from "utils/constants";
import { useSwitchThemeContext } from "hooks";
import { useMemberWithSkill } from "hooks";

const MembersTableBodyCell = ({ children, sxProp, ...otherProps }) => {
  return (
    <TableCell align="center" sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

export default function MemberSkillsTable({ isSelectedValue, getMemberSkillsData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const [membersSkillsData, setmembersSkillsData] = useState([]);
  const {
    data: rawData,
    isLoading: getMemberSkillsLoading,
    isError,
    error,
    refetch,
  } = useMemberWithSkill(isSelectedValue);

  useEffect(() => {
    refetch();
  }, [isSelectedValue, refetch]);

  useEffect(() => {
    if (!getMemberSkillsLoading) {
      const skillsData = rawData
      ? rawData.map((skl, idx) => {
          return {
            full_name: skl.full_name,
            skills: skl.skills.join(", "),
            project_status:
              skl.project_id === 21 ? "Bench" : "In a Project",
          };
        })
      : [];
      getMemberSkillsData(skillsData)
      setmembersSkillsData(skillsData);
    }
  }, [getMemberSkillsData, rawData, getMemberSkillsLoading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
    <Box sx={{ overflowX: "auto" }} id="get-member-skills-container">
      <Table
        sx={{ mt: 3, mb: 0.5, mx: { xs: 1, sm: 0 }, minWidth: 825 }}
        aria-label="member-skills-table"
      >
        <TableHead>
          <TableRow>
            {MEMBERS_TABLE_SKILLS.map((column) => (
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
        {getMemberSkillsLoading && (
          <TableBody>
            <TableRow>
              <MembersTableBodyCell
                colSpan={6}
                sxProp={{ ...tableCellStyle, py: 2.5 }}
              >
                <CircularProgress
                  sx={{
                    color:
                      currentTheme === "dark" || currentTheme === "teal"
                        ? "#0a7578 !important"
                        : currentThemePalette.dark,
                  }}
                  size="5rem"
                />
              </MembersTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {isError && (
          <TableBody>
            <TableRow
              sx={{
                backgroundColor:
                  currentTheme === "dark"
                    ? currentThemePalette.medium
                    : "#FFFFFF",
              }}
            >
              <MembersTableBodyCell
                colSpan={6}
                sxProp={{ ...tableCellStyle, py: 2.5 }}
              >
                Error: {error.message}
              </MembersTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!getMemberSkillsLoading &&
          membersSkillsData &&
          membersSkillsData.length === 0 && (
            <TableBody>
              <TableRow>
                <MembersTableBodyCell
                  colSpan={6}
                  sxProp={{ ...tableCellStyle, py: 2.5 }}
                >
                  {"No members found for this skills"}
                </MembersTableBodyCell>
              </TableRow>
            </TableBody>
          )}
        {!getMemberSkillsLoading &&
          membersSkillsData &&
          membersSkillsData.length > 0 && (
            <>
              <TableBody>
                {(rowsPerPage > 0
                  ? membersSkillsData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : membersSkillsData
                ).map((membersSkillsData) => (
                  <TableRow
                    key={membersSkillsData.full_name}
                    hover
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        currentTheme === "dark"
                          ? currentThemePalette.medium
                          : "#FFFFFF",
                      "&:hover": {
                        backgroundColor:
                          currentTheme === "dark" ? "#293A46 !important" : null,
                      },
                    }}
                  >
                    <MembersTableBodyCell sxProp={tableCellStyle}>
                      {membersSkillsData.full_name}
                    </MembersTableBodyCell>
                    <MembersTableBodyCell sxProp={tableCellStyle}>
                      {membersSkillsData.skills}
                    </MembersTableBodyCell>
                    <MembersTableBodyCell sxProp={tableCellStyle}>
                      {membersSkillsData.project_status}
                    </MembersTableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow
                  sx={{
                    backgroundColor:
                      currentTheme === "dark"
                        ? currentThemePalette.medium
                        : "#FFFFFF",
                  }}
                >
                  <TablePagination
                    colSpan={6}
                    count={membersSkillsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                      sx: {
                        border:
                          currentTheme === "dark"
                            ? `1px solid ${currentThemePalette.light}`
                            : null,
                        borderRadius: currentTheme === "dark" ? 1 : null,
                        "& .MuiSvgIcon-root": {
                          color:
                            currentTheme === "dark"
                              ? currentThemePalette.light
                              : null,
                        },
                      },
                      MenuProps: {
                        sx: {
                          "& .MuiList-root": {
                            borderRadius: currentTheme === "dark" ? 1 : null,
                            border:
                              currentTheme === "dark"
                                ? `1px solid ${currentThemePalette.light} !important`
                                : null,
                            backgroundColor: currentThemePalette.bgPrimary,
                            color: currentThemePalette.text,
                          },
                        },
                      },
                    }}
                    sx={{
                      ...tableCellStyle,
                      "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                        color: currentTheme === "dark" ? "#293A46" : null,
                      },
                    }}
                  />
                </TableRow>
              </TableFooter>
            </>
          )}
      </Table>
    </Box>
  );
}
