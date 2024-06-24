import { Template } from "aws-cdk-lib/assertions";
import { App } from "aws-cdk-lib";
import { AwsLambdaLogFormatStack } from "../lib/aws-lambda-log-format-stack";

describe("The AwsLambdaLogFormatStack stack", () => {
 it("matches the snapshot", () => {
  const app = new App();
  const stack = new AwsLambdaLogFormatStack(app, "ServiceCatalogue", {
   env: { region: "eu-west-1" },
  });
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
 });
});
