import "reflect-metadata"; // for class-transformer
import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { create } from "domain";

interface ServiceProps {}

export class ServiceStack extends Construct {  
  public readonly emailHandler: NodejsFunction;
  public readonly otpHandler: NodejsFunction;


  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(180),
    }; 

    this.emailHandler = new NodejsFunction(this, "CustomerEmailhandler", {
      entry: join(__dirname, "/../src/handlers/index.ts"),
      ...nodeJsFunctionProps,
    });
    
    this.otpHandler = new NodejsFunction(this, "CustomerOTPhandler", {
      entry: join(__dirname, "/../src/handlers/index.ts"),
      ...nodeJsFunctionProps,
    }); 
    
  }
}