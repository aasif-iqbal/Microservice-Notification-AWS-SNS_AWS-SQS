import twilio from "twilio";

const accountSid = "AC5dxxxxxxxxxxxxxxxxxxxxx633460";
const authToken = "18c93xxxxxxxxxxxxxxxxxxxxx42da83";

const client = twilio(accountSid, authToken);

export const SendVerificationCode = async (
  code: number,
  toPhoneNumber: string
) => {
  const response = await client.messages.create({
    body: `Your verification code is ${code} it will expire within 30 minutes.`,
    from: "+18138963397",
    to: toPhoneNumber.trim(),
  });
  console.log(response);
  return response;
};