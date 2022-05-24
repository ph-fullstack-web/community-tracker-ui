
import { useEffect } from "react";
import useGetCommunities from "hooks/useGetCommunities";
import Logo from "components/Layout/Logo";
import PageTitle from "components/Layout/PageTitle";
import PageContainer from "components/Layout/PageContainer";
import CommunityList from "components/community/CommunityList";


const Communities = () => {
    const {loading, data: communityData} = useGetCommunities();
    useEffect(() => {
    }, [loading, communityData])
    
    return (
        <PageContainer>
            <Logo/>
            <PageTitle title="Community selection page." />
            
            <CommunityList loading={loading} communities={communityData} />

        </PageContainer>
    )
}

export default Communities;