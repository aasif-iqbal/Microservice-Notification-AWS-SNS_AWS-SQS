import sendgrid from '@sendgrid/mail';
import * as AWS from 'aws-sdk';

export const SendEmailUsingSES = async (
  to: string,
  message: string
) => {
  var params = {
    Destination: {
      // Required
      CcAddresses: ["johndeo8789@gmail.com"],
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Body:{
          Html:{
            Charset: 'UTF-8',
            Data: message
          }
        },
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Order Confirmation - Test',
      },
    },
    Source:"johndeo8789@gmail.com", // Replace with your verified sender email
    ReplyToAddresses: ["johndeo8789@gmail.com"], // Replace with your verified sender email
  };

  const ses = new AWS.SES({ apiVersion: '2010-12-01' });

  try {
    const response = await ses.sendEmail(params).promise();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/*
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
sendgrid.setApiKey(SENDGRID_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || ''; // Replace with your verified sender email
const TEMP_ORDER_CONFIRMATION = ''; // Replace with your dynamic template ID

export interface EmailTemplate {
    to: string;
    from: string;
    templateId: string;
    dynamic_template_data: Record<string, unknown>;
}

export const ORDER_CONFIRMATION = (
  email: string,
  firstName: string,
  orderNumber: string
): EmailTemplate => {
  return {    
    from: FROM_EMAIL,
    to: email,
    templateId: TEMP_ORDER_CONFIRMATION,
    dynamic_template_data: {      
      name: firstName,
      order_number: orderNumber,
    },
  };
};

export const SendEmail = async (template: EmailTemplate) => {
    try {
      await sendgrid.send(template);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

// Generate Template from Sendgrid Dashboard(https://sendgrid.com/dynamic-templates) and Copy Template ID
*/ 