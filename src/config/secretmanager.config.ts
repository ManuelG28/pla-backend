/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const name = 'projects/my-project/secrets/my-secret/versions/5';
// const name = 'projects/my-project/secrets/my-secret/versions/latest';

// Imports the Secret Manager library
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
import { Injectable } from '@nestjs/common';

// Instantiates a client

export async function accessSecretVersion(secret: string) {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name :  secret,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
  console.info(`Payload: ${payload}`);

}
