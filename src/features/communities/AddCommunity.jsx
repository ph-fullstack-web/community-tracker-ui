
import PageContainer from 'layout/PageContainer';
import CommunityForm from 'components/community/CommunityForm';
import { addCommunityService } from 'services';
import { useNavigate } from 'react-router-dom';

const AddCommunity = () => {
  const navigator = useNavigate();
  const onSaveCommunity = async (data) => {
    await addCommunityService(data);
    navigator('/communities');
  };
  return (
    <PageContainer>
      <CommunityForm onClickHandler={onSaveCommunity} buttonText={'SAVE'} />
    </PageContainer>
  );
};

export default AddCommunity;
