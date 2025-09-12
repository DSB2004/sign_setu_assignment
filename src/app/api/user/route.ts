"use server";
import { validate } from "@/util/validate.util";
import { getDB } from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
interface CheckUserDTO {
  path: string;
}

export const checkAccount = async (data: CheckUserDTO) => {
  const { path } = data;
  try {
    await getDB();
    const { email, authId } = await validate({ path });
    const doc = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });

    if (!doc) {
      console.warn(`[CHECK ACCOUNT] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    return { success: true, message: "User account found" };
  } catch (err) {
    console.error(`[CHECK ACCOUNT] Error getting user account ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") as string;
  const res = await checkAccount({ path });
  if (res.success) {
    return NextResponse.json(
      {
        ...res,
      },
      { status: 200 }
    );
  }
  return NextResponse.json(
    {
      ...res,
    },
    { status: 404 }
  );
}
