import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LoggingFormat, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs/lib/function";

export class AwsLambdaLogFormatStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    Tags.of(this).add("Stack", "playground");
    Tags.of(this).add("Stage", "TEST");
    Tags.of(this).add("gu:repo", "guardian/aws-lambda-log-format");

    const lambdaProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_20_X,
      handler: "main",
      entry: path.join(__dirname, `/../src/lambda.ts`),
      bundling: {
        minify: true,
        externalModules: ["@aws-sdk"],
      },
      environment: {
        STACK: "playground",
        STAGE: "TEST",
      }
    }

    const textFormatFunction = new NodejsFunction(this, "TextFormatFunction", {
      ...lambdaProps,
      environment: {
        ...lambdaProps.environment,
        APP: "text-format-function",
      },
      loggingFormat: LoggingFormat.TEXT,
    });

    Tags.of(textFormatFunction).add("App", "text-format-function");

    const jsonFormatFunction = new NodejsFunction(this, "JsonFormatFunction", {
      ...lambdaProps,
      environment: {
        ...lambdaProps.environment,
        APP: "json-format-function",
      },
      loggingFormat: LoggingFormat.JSON,
    });

    Tags.of(jsonFormatFunction).add("App", "json-format-function");
  }
}
