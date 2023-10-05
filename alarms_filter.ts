const iamRoleChangeEventFilter = FilterPattern.all(
  // IAM role events
  FilterPattern.stringValue('$.eventSource', '=', 'iam.amazonaws.com'),
  FilterPattern.any(
    FilterPattern.stringValue('$.eventName', '=', 'CreateRole'),
    FilterPattern.stringValue('$.eventName', '=', 'UpdateRole'),
    FilterPattern.stringValue('$.eventName', '=', 'DeleteRole'),
  ),
  // Assuming the "assume role" policy change
  FilterPattern.stringValue('$.eventName', '=', 'UpdateAssumeRolePolicy'),
);

const ecsEventFilter = FilterPattern.all(
  // ECS events
  FilterPattern.stringValue('$.eventSource', '=', 'ecs.amazonaws.com'),
  FilterPattern.any(
    FilterPattern.stringValue('$.eventName', '=', 'RunTask'),
    FilterPattern.stringValue('$.eventName', '=', 'StartTask'),
    FilterPattern.stringValue('$.eventName', '=', 'StopTask'),
    // Add more ECS-related event names as needed
  ),
);

// Combine all filters
const combinedFilter = FilterPattern.any(iamChangeEventFilter, iamRoleChangeEventFilter, ecsEventFilter);
