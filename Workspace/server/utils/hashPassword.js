import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (entered, stored) => {
  return await bcrypt.compare(entered, stored);
};