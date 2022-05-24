import { useQuery } from "react-query";
import {getCommunities} from '../services/CommunityService';

const useGetCommunities = () => {
    
    const {isLoading, isError, data, error} = useQuery('communities', () => getCommunities(), {
        staleTime: 10000
    });

    return {
        isLoading,
        isError,
        error,
        data
    }

}

export default useGetCommunities;