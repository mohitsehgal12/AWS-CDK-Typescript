// Create a policy statement for ALLOW outside the condition
const allowPolicy = new PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['s3:GetObject', 's3:ListBucket'],
    resources: [`${this.snapshotBucket.bucketArn}/*`],
    principals: roleArns,
});

if (stageProps.createAccessAlarm) {
    // Create a policy statement for DENY inside the condition
    const denyPolicy = new PolicyStatement({
        effect: iam.Effect.DENY,
        actions: ['s3:GetObject'],
        resources: [`${this.snapshotBucket.bucketArn}/*`],
        notPrincipals: roleArns,
    });

    // Add the DENY policy to the resource policy
    this.snapshotBucket.addToResourcePolicy(denyPolicy);
}

// Add the ALLOW policy to the resource policy outside the condition
this.snapshotBucket.addToResourcePolicy(allowPolicy);
