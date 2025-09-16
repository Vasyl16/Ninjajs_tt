export class AppError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);

    this.status = status;
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

export type ErrorField = {
  name: string;
  message: string;
};

export class ValidationError extends BadRequestError {
  public fields: ErrorField[];

  constructor(message: string, fields: ErrorField[]) {
    super(message);

    this.fields = fields;
  }
}

export class UnathorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class PayloadTooLarge extends AppError {
  constructor(message: string) {
    super(message, 413);
  }
}
