import addCommunityService from "./community-service/addCommunityService";
import { getCommunities } from "./community-service/getCommunity";
import { getCommunityById } from "./community-service/getCommunityById";
import updateCommunityService from "./community-service/updateCommunityService";
import { getManagers } from "./people-service/getManagers";
import {getMembers} from "./people-service/getMembers";

export {
    addCommunityService,
    getCommunities,
    getCommunityById,
    updateCommunityService,
    getManagers,
    getMembers
}