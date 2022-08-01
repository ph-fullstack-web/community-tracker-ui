import useToggle from "./common/useToggle";
import useSwitchThemeContext from "./theme/useSwitchThemeContext";
import useGetManagers from "./people/useGetManagers";
import useGetCommunities from "./communities/useGetCommunities";
import useGetCommunityById from "./communities/useGetCommunityById";
import useGetMembers from "./people/useGetMembers";
import useLocalStorage from "./common/useLocalStorage";
import useCreatePeople from "./people/useCreatePeople";
import useGetPeopleById from "./people/useGetPeopleById";
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
};
