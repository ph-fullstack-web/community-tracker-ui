import moment from "moment";
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from "xlsx";
import Button from "@mui/material/Button";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import CircularProgress from "@mui/material/CircularProgress";
import { useSwitchThemeContext } from "hooks";
import { TABLE_HEADERS } from "utils/constants";

const ExportButton = ({ isLoading, membersData, rowData }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const contrastingColors =
    currentTheme === "dark"
      ? currentThemePalette.light
      : currentThemePalette.medium;

  const downloadExcel = () => {
    const headers = TABLE_HEADERS.map((header) => header.name);
    const headersArr = [headers];

    const exportData = rowData.map((row) => ({
      Name: row.full_name,
      "Assigned To": row.assigned_to,
      "Hired Date": row.hired_date_formatted,
      State: row.work_state,
      "Job Level": row.job_level,
      Project: row.project,
    }));

    const workbook = xlsxUtils.book_new();
    const worksheet = xlsxUtils.json_to_sheet(headersArr);
    xlsxUtils.sheet_add_aoa(worksheet, headersArr);

    // Start in second row to avoid overriding and skipping headers
    xlsxUtils.sheet_add_json(worksheet, exportData, {
      origin: "A2",
      skipHeader: true,
    });

    // Autofit column widths
    const columnWidths = getAutoFittedColumnWidths(exportData, headers);
    worksheet["!cols"] = columnWidths;

    const communityNameFilename = membersData.community_name
      .split(" ")
      .join("_");

    //prettier-ignore
    const fileName = `${communityNameFilename}_${moment().format("MM-DD-YYYY")}.xlsx`;

    xlsxUtils.book_append_sheet(
      workbook,
      worksheet,
      membersData.community_name
    );

    xlsxWriteFile(workbook, fileName);
  };

  const getAutoFittedColumnWidths = (json, header) => {
    const jsonKeys = header ? header : Object.keys(json[0]);

    let objectMaxLength = [];
    for (let i = 0; i < json.length; i++) {
      let value = json[i];
      for (let j = 0; j < jsonKeys.length; j++) {
        if (typeof value[jsonKeys[j]] == "number") {
          objectMaxLength[j] = 10;
        } else {
          const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

          objectMaxLength[j] = objectMaxLength[j] >= l ? objectMaxLength[j] : l;
        }
      }

      let key = jsonKeys;
      for (let j = 0; j < key.length; j++) {
        objectMaxLength[j] =
          objectMaxLength[j] >= key[j].length
            ? objectMaxLength[j]
            : key[j].length;
      }
    }

    return objectMaxLength.map((w) => {
      return { width: w };
    });
  };

  return (
    <Button
      variant="outlined"
      disabled={!(!isLoading && rowData && rowData.length > 0)}
      startIcon={
        isLoading ? (
          <CircularProgress size="1rem" sx={{ color: "#0000001f" }} />
        ) : (
          <FileDownloadRoundedIcon />
        )
      }
      sx={{
        minWidth: "35px",
        width: "35px",
        height: "35px",
        borderWidth: 2,
        borderColor: contrastingColors,
        backgroundColor: currentThemePalette.bgPrimary,
        color:
          currentTheme === "dark"
            ? currentThemePalette.light
            : currentThemePalette.dark,
        "&:hover": {
          borderWidth: 2,
          borderColor: contrastingColors,
          backgroundColor:
            currentTheme === "dark" ? "#293A46 !important" : null,
        },
        "&:disabled": {
          borderWidth: 2,
          borderColor:
            currentTheme === "dark" ? currentThemePalette.medium : null,
          backgroundColor:
            currentTheme === "dark" ? "#293A46 !important" : null,
        },
        "& .MuiButton-startIcon": {
          margin: 0
        },
      }}
      onClick={downloadExcel}>
    </Button>
  );
};

export default ExportButton;
