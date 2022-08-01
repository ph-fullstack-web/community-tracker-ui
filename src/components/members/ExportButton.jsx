import moment from "moment";
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from "xlsx";
import Button from "@mui/material/Button";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { useSwitchThemeContext } from "hooks";

const ExportButton = ({ isLoading, membersData, rowData, tableHeaders, fileNameData }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const contrastingColors =
    currentTheme === "dark"
      ? currentThemePalette.bgPrimary
      : currentThemePalette.medium;

  const downloadExcel = () => {
    const headers = tableHeaders.map((header) => header.name);
    const headersArr = [headers];

    let exportData = [];
    for(let i = 0; i < rowData.length; i++) {
       let value = rowData[i];
       let objectValue = {}
      for(let j = 0; j < tableHeaders.length; j++){
          let key = tableHeaders[j].name;
          let valueKey = tableHeaders[j].value;
          objectValue[key] = value[valueKey]
      }
      exportData.push(objectValue)

    }

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

    const communityNameFilename = membersData ? membersData.community_name : fileNameData
      .split(" ")
      .join("_");

    //prettier-ignore
    const fileName = `${communityNameFilename}_${moment().format("MM-DD-YYYY")}.xlsx`;
    const exportFileName = membersData ? membersData.community_name : fileNameData;
    xlsxUtils.book_append_sheet(
      workbook,
      worksheet,
      exportFileName
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
          <FileDownloadRoundedIcon />
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
