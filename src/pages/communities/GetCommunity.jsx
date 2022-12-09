import PageContainer from 'layout/PageContainer';
import CommunityForm from 'components/community/CommunityForm';
import {useNavigate, useParams} from 'react-router-dom';
import {useTransition} from 'react';
import {useGetCommunityById} from 'hooks';
//import mockData from 'MOCKS/communityById.json'

const GetCommunity = () => {
  // eslint-disable-next-line
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: communityData} = useGetCommunityById(id);

  const onClick = () => {
    startTransition(() => {
      navigate('/communities');
    });
  };
  return (
    <PageContainer>
      <CommunityForm
        onClickHandler={onClick}
        buttonText={'BACK'}
        community={communityData}
      />
    </PageContainer>
  );
};

export default GetCommunity;
