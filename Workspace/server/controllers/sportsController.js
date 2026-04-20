import { getLiveCricket } from "../services/sportsService.js";

export const cricketLive = async (req, res) => {
  try {
    const data = await getLiveCricket();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};