export class InternalServerError extends Error {
  status = 500;

  constructor(message: string) {
    super(`Internal Server Error: ${message}`);

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
