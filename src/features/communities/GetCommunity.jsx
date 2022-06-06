import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import { useNavigate, useParams } from "react-router-dom";
import { useTransition } from "react";
import useGetCommunityById from "hooks/Communities/useGetCommunityById";

//import communityData from 'MOCKS/communityById.json';

const GetCommunity =  () => {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate()
    const {id} = useParams()
    const { isLoading, data: communityData, isError, error } = useGetCommunityById(id)

    const onClick = () => {
      startTransition(() => {
        navigate('/communities')
      })

    }
    return (
      <PageContainer>
        <PageTitle title="Community Information Page." />
        <CommunityForm onClickHandler={onClick} buttonText={"BACK"} community={communityData}/>
      </PageContainer>
    );
  };

export default GetCommunity;