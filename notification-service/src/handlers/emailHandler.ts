import {SQSEvent} from "aws-lambda";

export const CustomerEmailhandler = async (event: SQSEvent) => {
  console.log(event.Records[0].body)
  return {
    
  }
}