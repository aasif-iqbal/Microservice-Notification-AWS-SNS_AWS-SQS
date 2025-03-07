import {SQSEvent} from "aws-lambda";

export const CustomerOTPhandler = async (event: SQSEvent) => {
  console.log(event.Records[0].body)
  return {
    
  }
}