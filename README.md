# AWS CDK Setup and Notification Service

## **Installation**

### **Install AWS CDK**
```sh
npm install -g aws-cdk
cdk --version
```

### **Configure AWS CLI**
```sh
aws configure
```
- **Key ID**: Find it in AWS IAM → Users → Security Credentials
- **Secret Key**: Find it in AWS IAM → Users → Security Credentials

### **Verify AWS Configuration**
```sh
aws configure list
aws sts get-caller-identity
```

### **Bootstrap AWS CDK**
```sh
cdk bootstrap aws://851725641919/ap-south-1
```

---

## **Initialize CDK Application**
```sh
cdk init app --language=typescript  # (Directory must be empty)
```

### **Install Dependencies**
```sh
npm install twilio         # SMS Integration
npm i aws-sdk             # AWS SDK
npm i aws-lambda          # AWS Lambda Functions
npm install --save-dev @types/aws-lambda  # AWS Lambda Types
npm i class-validator     # Validation
npm i class-transformer   # Data Transformation
npm i @sendgrid/mail      # Email Sending via SendGrid
npm i reflect-metadata    # Metadata Reflection
```

---

## **Define Stacks for Notification Service**

1. **Create the Service Stack**
```sh
mkdir lib
cd lib
nano service-stack.ts
```
2. **Define Lambda Function**
```sh
mkdir src (inside notification-service)
cd src
mkdir dtos handlers providers utility
```

---

## **Start Docker (If Required)**
```sh
docker start
```

---

## **AWS CDK Commands**

### **Synthesize CloudFormation Template**
```sh
cdk synth
```
> **What does `cdk synth` do?**  
> The `cdk synth` command translates your CDK code into a JSON-formatted AWS CloudFormation template, which AWS can then deploy.

### **Deploy to AWS**
```sh
cdk deploy --verbose --trace
cdk deploy
```

---

## **Verify Deployment in AWS Console**
1. Log in to your **AWS account**
2. Navigate to **AWS CloudFormation**
3. Find **NotificationServiceStack**
4. Locate the **Export Name**:
   - **Key-NotificationTopic | export name - notifySvcArn**

---

## **Testing AWS SNS Message Publishing**
1. **Go to AWS SNS**
2. Click **Topics**
3. Select **NotificationServiceStack**
4. Click **Publish message** (to topic)

---

> This guide helps you configure AWS CDK, deploy a notification service, and test it using AWS SNS & Twilio.

