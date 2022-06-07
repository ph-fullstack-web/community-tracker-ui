import { useQuery } from "react-query";
import { getMembers } from "services/PeopleService/GetMembers";


const useGetMembers = () => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('members', () => getMembers(), {
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