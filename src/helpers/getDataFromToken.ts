import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.decode(token);

    return decodedToken.id;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired");
      // Handle token expiration, e.g., redirect to login or refresh the token
    } else {
      console.error("Error decoding token:", error.message);
      throw new Error("Failed to decode token");
    }
  }
};
