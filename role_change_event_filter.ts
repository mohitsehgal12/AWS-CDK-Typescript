import { ArnPrincipal } from 'aws-cdk-lib/aws-iam';
import { FilterPattern } from 'aws-cdk-lib/aws-logs';

// Assuming stageProps is available in this file
const roleArns: ArnPrincipal[] = [new ArnPrincipal(`arn:aws:iam::${stageProps.account}:role/ZoltarScanTaskRole`)];

const iamRoleChangeEventFilter = FilterPattern.all(
  // Assuming the "assume role" policy change
  FilterPattern.stringValue('$.eventName', '=', 'UpdateAssumeRolePolicy'),
  // Filter only on role ARNs with access to the snapshot bucket
  FilterPattern.any(
    ...roleArns.map((arnPrincipal) => FilterPattern.stringEquals('$.userIdentity.arn', arnPrincipal.arn))
  )
);
