import moment from "moment";
import { useQuery } from "react-query";
import { getMembers } from "services/PeopleService/GetMembers";


const useGetMembers = () => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('members', () => getMembers(), {
        staleTime: 10000,
        select: (membersData) => {
            return {
                ...membersData,
                members: membersData.members.map(member => ({
                    ...member,
                    hired_date_formatted: moment(member.hired_date).format("MM/DD/YYYY")
                }))
            }
        }
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