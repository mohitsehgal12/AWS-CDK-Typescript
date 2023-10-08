// Declare and define roleArns with actual role ARNs
const roleArns: string[] = [
  'arn:aws:iam::account-id-with-access:role/RoleWithAccess',
  // Add more role ARNs as needed
];

const iamRoleChangeEventFilter = FilterPattern.all(
  // Assuming the "assume role" policy change
  FilterPattern.stringValue('$.eventName', '=', 'UpdateAssumeRolePolicy'),
  // Filter only on role ARNs with access to the snapshot bucket
  FilterPattern.any(
    ...roleArns.map((roleArn: string) => FilterPattern.stringValue('$.requestParameters.roleName', '=', roleArn))
  )
);
