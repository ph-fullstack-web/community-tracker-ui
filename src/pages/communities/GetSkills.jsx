import React, { useState, useEffect } from 'react';
import PageContainer from 'layout/PageContainer';
import { Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AutocompleteInputChip } from '../../components/index.js';
import { useGetSkills } from 'hooks';
import { postSkills } from 'services';
import AppButton from 'components/common/AppButton.jsx';

const GetSkills = () => {
  const { data, isLoading } = useGetSkills();
  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); //selected values include existing and new values
  const [newValues, setNewValues] = useState([]); //new values

  useEffect(() => {
    if (!isLoading) {
      setOptions(
        data?.map((skl, idx) => {
          return { id: skl.peopleskills_id, label: skl.peopleskills_desc };
        })
      );
    }
  }, [data, isLoading]);

  function prepareInput(skl, idx, arr) {
    postSkills({ peopleskills_desc: skl.label, is_active: true });
  }

  const onSave = async () => {
    //save new skills to peopleskills db
    if (newValues.length > 0) newValues.forEach(prepareInput);
  };

  return (
    <PageContainer>
      <Box height="100vh" display="flex" flexDirection="column">

        {options.length >= 0 && (
          <AutocompleteInputChip
            options={options}
            setOptions={setOptions}
            setSelectedValue={setSelectedSkills}
            newValues={newValues}
            setNewValues={setNewValues}
          />
        )}
        <AppButton
          sx={{ width: 150, mt: 3, ml: 'auto' }}
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
        >
          Save
        </AppButton>
      </Box>
    </PageContainer>
  );
};

export default GetSkills;
