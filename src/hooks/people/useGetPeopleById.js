import { useQuery } from "react-query";
import { getPeopleById } from "services/people-service/GetPeopleById";


const useGetPeopleById = (peopleId) => {
    
    const {isLoading, isError, data, error, refetch} = useQuery(['people-by-id', peopleId], () => getPeopleById(peopleId), {
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

export default useGetPeopleById;