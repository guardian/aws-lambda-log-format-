function getEnvOrThrow(key: string): string {
 const value: string | undefined = process.env[key];
 if (value === undefined) {
  throw new Error(`Environment variable ${key} is not set.`);
 }
 return value;
}

function getConfig() {
 return {
  stack: getEnvOrThrow("STACK"),
  stage: getEnvOrThrow("STAGE"),
  app: getEnvOrThrow("APP")
 }
}

export async function main(...args: unknown[]) {
 const { stage, app } = getConfig();

 console.log(
  `${app} (${stage}) called with ${args.map((arg) => JSON.stringify(arg)).join(", ")}`,
 );

 console.log("This is a plain text message");
 console.log({ message: "This is a JSON message with markers", status: 200 });
 console.log(JSON.stringify({ message: "This is a JSON.stringify message with markers", status: 200 }));
 console.log("This is a plain text message with markers", { status: 200 });
}
