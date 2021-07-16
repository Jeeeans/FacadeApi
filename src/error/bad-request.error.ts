export class BadRequestError extends Error {
  status = 400;

  constructor() {
    super('Bad Request');

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
