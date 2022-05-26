import { useQuery } from "react-query";
import {getCommunities} from '../../services/CommunityService/GetCommunity';

const useGetCommunities = () => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('communities', () => getCommunities());

    return {
        isLoading,
        isError,
        error,
        data,
        refetch
    }

}

export default useGetCommunities;