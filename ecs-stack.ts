// lib/ecs-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ECSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MyCluster');

    // Create a task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTaskDefinition');

    // Define a container within the task
    const container = taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromRegistry('nginx:latest'),
    });

    // Create an ECS service
    const service = new ecs.FargateService(this, 'MyService', {
      cluster,
      taskDefinition,
    });

    // Define an IAM role
    const myRole = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    // Add a policy statement to the IAM role
    myRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'], // Add the necessary actions
        resources: ['arn:aws:s3:::your-s3-bucket/*'], // Replace with your S3 bucket ARN
      })
    );

    // Output the ECS service URL
    new cdk.CfnOutput(this, 'ServiceURL', {
      value: service.loadBalancer.loadBalancerDnsName,
      description: 'ECS Service URL',
    });
  }
}
