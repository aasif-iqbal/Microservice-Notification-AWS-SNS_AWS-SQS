import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NotificationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //email queue(AWS-SQS)
    const emailQueue = new sqs.Queue(this, 'NotificationServiceQueue', {
      visibilityTimeout: cdk.Duration.seconds(300), //timeout of processing a single message
    });

    // sms queue

    // topic -> customer_email, customer_otp (consume by ProductService and transaction service)

    // email handler

    // opt handler

    // add subscription


  }
}
