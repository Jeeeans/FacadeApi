export class ForbiddenError extends Error {
  status = 403;
  reason: ForbiddenReasonType;
  action: ForbiddenActionType;

  constructor(reason: ForbiddenReasonType, action: ForbiddenActionType) {
    super('Forbidden');

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);

    this.reason = reason;
    this.action = action;
  }
}

export enum ForbiddenReasonType {
  Unknown = 'Unknown',
  InsufficientPermission = 'InsufficientPermission',
}

export enum ForbiddenActionType {
  Unknown = 'Unknown',
  Login = 'Login',
}
