import addCommunityService from "./community-service/AddCommunityService";
import { getCommunities } from "./community-service/GetCommunity";
import { getCommunityById } from "./community-service/GetCommunityById";
import updateCommunityService from "./community-service/UpdateCommunityService";
import { getManagers } from "./people-service/GetManagers";
import {getMembers} from "./people-service/GetMembers";
import { getProjects } from "./ProjectsService/GetProjects";
export {
    addCommunityService,
    getCommunities,
    getCommunityById,
    updateCommunityService,
    getManagers,
    getMembers,
    getProjects
}