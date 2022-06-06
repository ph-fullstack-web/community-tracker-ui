import { useQuery } from "react-query";
import { getCommunityById } from "services/CommunityService/GetCommunityById";


const useGetCommunityById = (id) => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('community', () => getCommunityById(id));

    return {
        isLoading,
        isError,
        error,
        data,
        refetch
    }

}

export default useGetCommunityById;