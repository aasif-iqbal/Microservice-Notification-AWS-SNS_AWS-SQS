import sendgrid from '@sendgrid/mail';

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