import AuthModel from "@/models/auth.model";
import { getDB } from "@/lib/db";
import { createJWT, verifyJWT } from "@/util/jwt.util";
import { TokenType } from "@/types/auth";
import { setCookies } from "@/util/cookies.util";
interface VerificationDTO {
  token: string;
}

export const verification = async (data: VerificationDTO) => {
  const { token } = data;

  await getDB();

  try {
    const res = await verifyJWT<{ email: string; action: TokenType }>(token);

    if (res == null) {
      return {
        status: false,
        message: "Failed! Unable to change password, Session Expired",
      };
    }
    const { email, action } = res;

    if (action !== TokenType.VERIFICATION) {
      return {
        status: false,
        message: "Failed! Wrong verification token provided",
      };
    }

    const user = await AuthModel.findOne({
      email,
    });

    if (!user) {
      console.warn(`[VERIFICATION] User ${email} not found`);
      return {
        success: false,
        message: `Failed! No Account found with email ${email}`,
      };
    }
    user.verified = true;
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
      message: `Verification successful for account ${email}`,
    };
  } catch (err) {
    console.error(`[VERIFICATION] Error happened ${err}`);
    return {
      status: false,
      message: "Internal Server Error",
    };
  }
};
