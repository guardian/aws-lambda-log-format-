#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsLambdaLogFormatStack } from "../lib/aws-lambda-log-format-stack";

const app = new cdk.App();
new AwsLambdaLogFormatStack(app, "AwsLambdaLogFormatStack", {
 env: {
  region: "eu-west-1",
 },
});
