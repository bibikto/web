import axios from "axios";
 
// get list of the users
export const getUserListService = async () => {
  try {
    return await axios.get(`https://35.154.15.13/api/users/getList/`);
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}