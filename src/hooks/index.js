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
import useGetSkills from "./skills/useGetSkills";
import usePostSkills from "./skills/usePostSkills";

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
};
