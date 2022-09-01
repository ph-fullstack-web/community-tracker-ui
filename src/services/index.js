import addCommunityService from "./community/AddCommunityService";
import getCommunities from "./community/GetCommunity";
import getCommunityById from "./community/GetCommunityById";
import getSkills from "./community/GetSkills";
import postSkills from "./community/PostSkills";
import updateCommunityService from "./community/UpdateCommunityService";
import getMemberWithSkills from "./community/GetMemberWithSkills"
import createPeople from "./people/CreatePeople";
import getManagers from "./people/GetManagers";
import getMembers from "./people/GetMembers";
import getPeopleById from "./people/GetPeopleById";
import updatePeople from "./people/UpdatePeople";
import getProjects from "./project/GetProjects";
import deleteProject from "./project/DeleteProject";
import updateProject from "./project/UpdateProject";
import deleteSkill from "./people-skills/DeletePeopleSkill";
import updateSkill from "./people-skills/UpdatePeopleSkill";
import updatePassword from "./communityadminandmanager/UpdatePassword";
import login from "./login/Login";
import getJobLevel from "./joblevel/GetJobLevel";
import getWorkState from "./workstate/GetWorkState";
import getPeopleDetails from "./people-details/GetPeopleDetails";
import createManager from "./communityadminandmanager/CreateManager";
import getCommunityManagers from "./communityadminandmanager/GetCommunityManagers";

export {
  addCommunityService,
  getCommunities,
  getCommunityById,
  getSkills,
  postSkills,
  updateCommunityService,
  getManagers,
  getMembers,
  getProjects,
  updatePeople,
  getPeopleById,
  createPeople,
  getMemberWithSkills,
  deleteSkill,
  updateSkill,
  deleteProject,
  updateProject,
  updatePassword,
  login,
  getJobLevel,
  getWorkState,
  getPeopleDetails,
  createManager,
  getCommunityManagers,
};
