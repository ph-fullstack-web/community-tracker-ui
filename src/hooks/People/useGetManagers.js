import { useQuery } from "react-query";
import { getManagers } from "services/PeopleService/GetManagers";


const useGetManagers = () => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('managers', () => getManagers(), {
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

export default useGetManagers;