import { SQSEvent } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { EmailInput } from "../dtos/email.dto";
import { AppValidationError } from "../utility/errors";
// import { ORDER_CONFIRMATION, SendEmail } from "../providers/email";
import { SendEmailUsingSES } from "../providers/email";

export const CustomerEmailhandler = async (event: SQSEvent) => {
  const response:Record<string,unknown>[] = [];

  const promises = event.Records.map(async (record) => {
    const input = plainToClass(EmailInput, JSON.parse(record.body));
    
    const errors = await AppValidationError(input);
    
    console.log('ERRORS:', JSON.stringify(errors)); 

    if (!errors) {
      const { to, name, order_number } = input;
      
      const emailBody = `Hello ${name}, your order number is ${order_number}`;
      await SendEmailUsingSES(to, emailBody);

      //const OrderTemplate = ORDER_CONFIRMATION(to, name, order_number);
      // SendEmail(OrderTemplate);
    }else{
      response.push({        
        error:JSON.stringify(errors),
      }); 
    }

  }); 

  await Promise.all(promises);
  console.log("SQS RESPONSE:",response);
  return {
    response
  }
}