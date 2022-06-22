import axiosInstance from "../axios/index";

const updatePeople = async ({ payload, peopleId }) => {
  try {
    const response = await axiosInstance.put(
      `/api/people/peopleid=${peopleId}`,
      {
        cognizantid_id: payload.cognizantId,
        full_name: payload.name,
        csv_email: payload.email,
        hired_date: payload.hiredDate,
        community_id: payload.community,
        workstate_id: parseInt(payload.state),
        joblevel_id: parseInt(payload.jobLevel),
        project_id: payload.project,

        last_name: "",
        first_name: "",
        middle_name: "",
        is_active: true,
        is_probationary: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }
    return await response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export default updatePeople;
