import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import communityData from 'communityById.json'
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";

const GetCommunity =  () => {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate()

    const onClick = () => {
      startTransition(() => {
        navigate('/communities')
      })

    }
    return (
      <PageContainer>
        <Logo />
        <PageTitle title="Community Information Page." />
        <CommunityForm onClickHandler={onClick} buttonText={"BACK"} community={communityData}/>
      </PageContainer>
    );
  };

export default GetCommunity;