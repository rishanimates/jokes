import axios from "axios";

export const SERVER_BASE_URL = `http://api.icndb.com/jokes/random`;

// axios api integration for fetching Jokes with given number 
const JokesAPI = {
  get: (randomCount) => axios.get(`${SERVER_BASE_URL}/${randomCount}`)
};

export default JokesAPI;
