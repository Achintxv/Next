import axios from "axios";

let cache = null;
let lastFetch = 0;

export const getLiveCricket = async () => {
  if (Date.now() - lastFetch < 30000 && cache) {
    return cache;
  }

  const res = await axios.get(
    `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRIC_API_KEY}`
  );

  cache = res.data;
  lastFetch = Date.now();

  return cache;
};