
import { useQuery } from "react-query";
import {getMembers} from "services"

const useGetMembers = (id) => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('members', () => getMembers(id), {
        staleTime: 10000
    });

    return {
        isLoading,
        isError,
        error,
        data,
        refetch
    }

}

export default useGetMembers;