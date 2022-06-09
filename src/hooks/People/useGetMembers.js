import moment from "moment";
import { useQuery } from "react-query";
import { getMembers } from "services/PeopleService/GetMembers";
import { jobLevelData, workStateData, projectData } from "features/members/mockData";


const useGetMembers = () => {
    
    const {isLoading, isError, data, error, refetch} = useQuery('members', () => getMembers(), {
        staleTime: 10000,
        select: (membersData) => {
            return {
                ...membersData,
                members: membersData.members.map(member => ({
                    ...member,
                    hired_date_formatted: moment(member.hired_date).format("MM/DD/YYYY"),
                    job_level: jobLevelData[member.joblevel_id - 1].job_level_desc,
                    work_state: workStateData[member.workstate_id - 1].work_state_desc,
                    project: projectData[member.project_id - 1].project_desc
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