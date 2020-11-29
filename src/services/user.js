import axios from "axios";
 
// get list of the users
export const getUserListService = async () => {
  try {
    return await axios.get(`/users/getList`);
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}