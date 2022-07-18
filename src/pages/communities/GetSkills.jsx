import React, { useState, useEffect } from "react";
import PageContainer from "layout/PageContainer";
import { Box, Card, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AutocompleteInputChip, NoDataTable } from "../../components/index.js";
import { useGetSkills } from "hooks";
import AppButton from "components/common/AppButton.jsx";
import MemberSkillsTable from "./GetMemberSkillsTable";
import { useSwitchThemeContext } from "hooks";
import { MEMBERS_TABLE_SKILLS } from "utils/constants";

const GetSkills = () => {
  const { data: skillsData, isLoading: getSkillsLoading } = useGetSkills();
  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); //selected values include existing and new values
  const [selectedPayload, setSelectedPayload] = useState();
  const [newValues, setNewValues] = useState([]); //new values
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (!getSkillsLoading) {
      setOptions(
        skillsData?.map((skl, idx) => {
          return { id: skl.peopleskills_id, label: skl.peopleskills_desc };
        })
      );
    }
  }, [skillsData, getSkillsLoading]);

  // function prepareInput(skl, idx, arr) {
  //   postSkills({ peopleskills_desc: skl.label, is_active: true });
  // }

  const onSave = async () => {
    // //save new skills to peopleskills db
    // if (newValues.length > 0) newValues.forEach(prepareInput);

    const skills = [];
    selectedSkills.forEach((arrayItem) => {
      let x = arrayItem.id;
      skills.push(x);
    });
    const skillsPayload = {
      skills: skills.toString(),
    };
    setSelectedPayload(skillsPayload);
    if (skills.length > 0) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  };
  const { currentThemePalette } = useSwitchThemeContext();

  return (
    <PageContainer>
      <Box
        style={{
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        <Card
          sx={{ padding: "2rem", backgroundColor: currentThemePalette.cardSecondary }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: { xs: "100%", lg: "135ch" }, flex: "0 1 auto" }}>
              {options.length >= 0 && (
                <AutocompleteInputChip
                  options={options}
                  setOptions={setOptions}
                  setSelectedValue={setSelectedSkills}
                  newValues={newValues}
                  setNewValues={setNewValues}
                />
              )}
            </Box>
            <Box>
              <AppButton
                sx={{ width: 150, ml: { xs: 1, sm: 3 } }}
                startIcon={<SearchIcon />}
                onClick={onSave}
              >
                Search
              </AppButton>
            </Box>
          </Stack>
          {!showData && <NoDataTable columns={MEMBERS_TABLE_SKILLS} />}
          {showData && <MemberSkillsTable isSelectedValue={selectedPayload} />}
        </Card>
      </Box>
    </PageContainer>
  );
};

export default GetSkills;
