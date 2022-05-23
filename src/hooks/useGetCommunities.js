import { useEffect, useState } from "react";
import {getCommunities} from '../services/CommunityService';

const useGetCommunities = () => {
    const [loading, setLoading] = useState(false);
    const [communities, setCommunities] = useState(null);

    useEffect(() => {
        setLoading(true);
        const getCommunitiesData = async () => {
            const data = await getCommunities();
            setCommunities(data)
            setLoading(false);
        }
        getCommunitiesData();

        return () => {
            setLoading(false)
            setCommunities(null)
        }
    }, [])

    return {
        loading,
        data: communities
    }
}

export default useGetCommunities;