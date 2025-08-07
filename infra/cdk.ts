import { App, Stack } from 'aws-cdk-lib';

// Placeholder CDK application for the study club stack.
const app = new App();
const stack = new Stack(app, 'StudyClubStack');

// TODO: define AppSync API, DynamoDB tables, Lambda resolvers, and S3 buckets.

app.synth();
