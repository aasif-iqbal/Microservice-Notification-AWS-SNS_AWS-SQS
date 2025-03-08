import { SQSEvent } from "aws-lambda";
import { SendVerificationCode } from "../providers/sms";
import { AppValidationError } from "../utility/errors";
import { OTPInput } from "../dtos/otp.dto";
import { plainToClass } from "class-transformer";

export const CustomerOTPhandler = async (event: SQSEvent) => {
  const response: Record<string, unknown>[] = [];

  const promises = event.Records.map(async (record) => {
    const input = plainToClass(OTPInput, JSON.parse(record.body));
    
    const errors = await AppValidationError(input);
    
    console.log('ERRORS:', JSON.stringify(errors));

    if (!errors) {
      const { phone, code } = input;
      await SendVerificationCode(Number(code), phone.trim());   
    }else{
      response.push({        
        errors,
      });
    }

  });

  await Promise.all(promises);
  console.log("SQS RESPONSE:",response);
  return {
    response  
  }
}