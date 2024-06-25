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

 console.info(`${app} (${stage}) begin`);

 console.debug(
  `${app} (${stage}) called with ${args.map((arg) => JSON.stringify(arg)).join(", ")}`,
 );

 // This log should appear in the `message` field within Central ELK.
 console.log("[log 1] This is a plain text message");

 // This log should appear in the `message` field within Central ELK, with a `status` marker.
 console.log({ message: "[log 2] This is a JSON message with markers", status: 200 });

 // This log should appear in the `message` field within Central ELK, with a `status` marker.
 console.log(JSON.stringify({ message: "[log 3] This is a JSON.stringify message with markers", status: 200 }));

 // This log should appear in the `message` field within Central ELK, with a `status` marker.
 // It probably will not, as that's not how `console.log` works!
 console.log("[log 4] This is a plain text message with markers", { status: 200 });

 // This log should appear in the `message` field within Central ELK, with a `status` marker.
 console.log(`[log 5] This is a plain text message with markers ${JSON.stringify('%s')}`, { status: 200 });

 console.info(`${app} (${stage}) end`);
}
