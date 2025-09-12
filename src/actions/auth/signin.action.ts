"use server";
import AuthModel from "@/models/auth.model";
import { getDB } from "@/lib/db";
import { createJWT } from "@/util/jwt.util";
import { comparePassword } from "@/util/hash.util";
import { TokenType } from "@/types/auth";
import { cookies } from "next/headers";
import { sendMail } from "@/worker/service/email.service";
import { setCookies } from "@/util/cookies.util";
interface SignInDTO {
  email: string;
  password: string;
  clientURL: string;
}

export const signIn = async (data: SignInDTO) => {
  const { email, password, clientURL } = data;

  await getDB();

  try {
    const user = await AuthModel.findOne({
      email,
    });

    if (!user) {
      console.warn(`[SIGNIN] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const compare = await comparePassword(password, user.password);

    if (!compare) {
      console.warn(`[SIGNIN] Incorrect credentials ${email}`);
      return {
        success: false,
        message: `Failed! Wrong credentials for ${email}`,
      };
    }

    if (!user.verified) {
      console.warn(`[SIGNIN] Verification required ${email}`);
      const token = await createJWT({
        payload: { email: user.email, action: TokenType.VERIFICATION },
        expireIn: "5m",
      });

      const url = clientURL + "/auth/verify?auth_token=" + token;

      await sendMail({
        content: `Please continue here to verify your account ${url}\nPlease note this session only active for next 5 minute\nAvoid this mail if you haven't requested this`,
        email: user.email,
        subject: "Account Verification",
      });

      return {
        redirect: true,
        success: false,
        message: `Failed! Verification pending for ${email}`,
      };
    }
    const _accessToken = await createJWT({
      payload: {
        authId: user._id.toString(),
        email: user.email,
        action: TokenType.ACCESS,
      },
      expireIn: 15 * 60,
    });

    const _refreshToken = await createJWT({
      payload: {
        authId: user._id.toString(),
        email: user.email,
        action: TokenType.REFRESH,
      },
      expireIn: "7d",
    });

    await setCookies({
      _accessToken,
      _refreshToken,
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (err) {
    console.error(`[SIGNIN] Error happened ${err}`);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
