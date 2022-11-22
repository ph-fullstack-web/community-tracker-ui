import useToggle from "./common/useToggle";
import useSwitchThemeContext from "./theme/useSwitchThemeContext";
import useGetManagers from "./people/useGetManagers";
import useGetCommunities from "./communities/useGetCommunities";
import useGetCommunityById from "./communities/useGetCommunityById";
import useGetMembers from "./people/useGetMembers";
import useLocalStorage from "./common/useLocalStorage";
import useCreatePeople from "./people/useCreatePeople";
import useGetPeopleById from "./people/useGetPeopleById";
import useGetPeopleByCSVEmail from "./people/useGetPeopleByCSVEmail";
import useUpdatePeople from "./people/useUpdatePeople";
import useGetProjects from "./projects/useGetProjects";
import useUpdateProject from "./projects/useUpdateProject";
import useDeleteProject from "./projects/useDeleteProject";
import useGetSkills from "./skills/useGetSkills";
import usePostSkills from "./skills/usePostSkills";
import useMemberWithSkill from "./skills/useMemberWithSkills";
import useUpdateSkill from './skills/useUpdateSkill';
import useDeleteSkill from "./skills/useDeleteSkill";
import useUpdatePassword from "./communityadminandmanager/useUpdatePassword";
import useLogin from "./login/useLogin";
import useGetWorkState from "./workstate/useGetWorkState";
import useGetJobLevel from "./joblevel/useGetJobLevel";
import useGetPeopleDetailsDesc from "./people-details/useGetPeopleDetailsDesc";
import useGetPeopleDetails from "./people-details/useGetPeopleDetails";
import useUpdateCommunity from "./communities/useUpdateCommunity";
import useCreateManager from "./communityadminandmanager/useCreateManager";
import useGetCommunityManagers from "./communityadminandmanager/useGetCommunityManagers";
import useCreateProject from "./projects/useCreateProject";
import useGetPeopleBySearchCriteria from "./people/useGetPeopleBySearchCriteria";

export {
  useCreatePeople,
  useLocalStorage,
  useGetMembers,
  useToggle,
  useGetManagers,
  useGetCommunities,
  useGetCommunityById,
  useSwitchThemeContext,
  useGetPeopleById,
  useGetPeopleByCSVEmail,
  useUpdatePeople,
  useGetSkills,
  useGetProjects,
  usePostSkills,
  useMemberWithSkill,
  useUpdateSkill,
  useDeleteSkill,
  useUpdateProject,
  useDeleteProject,
  useUpdatePassword,
  useLogin,
  useGetWorkState,
  useGetJobLevel,
  useGetPeopleDetailsDesc,
  useGetPeopleDetails,
  useUpdateCommunity,
  useCreateManager,
  useGetCommunityManagers,
  useCreateProject,
  useGetPeopleBySearchCriteria,
};
