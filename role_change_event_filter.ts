const iamRoleChangeEventFilter = FilterPattern.all(
  // Assuming the "assume role" policy change
  FilterPattern.stringValue('$.eventName', '=', 'UpdateAssumeRolePolicy'),
  // Filter only on role ARNs with access to the snapshot bucket
  FilterPattern.any(
    ...roleArns.map(roleArn => FilterPattern.stringValue('$.requestParameters.roleName', '=', roleArn))
  )
);
