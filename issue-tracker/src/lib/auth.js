import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

export function createToken(userId) {
  return jwt.sign(
    { userId: userId.toString() },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/*
  Used inside API routes
*/
export async function getCurrentUser(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    return await getUserFromToken(token);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}

/*
  Used inside Server Components
*/
export async function getCurrentUserFromCookies() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    return await getUserFromToken(token);
  } catch (error) {
    console.error("getCurrentUserFromCookies error:", error);
    return null;
  }
}

/*
  Shared user lookup
*/
async function getUserFromToken(token) {
  const decoded = verifyToken(token);

  if (!decoded?.userId) {
    return null;
  }

  await connectDB();

  const user = await User.findById(decoded.userId)
    .select("-password")
    .lean();

  return user;
}