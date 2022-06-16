export function errorResponse(code: number, message: any) {
  return {
    code,
    message,
  };
}

export function badRequest(message: any) {
  return errorResponse(400, message);
}

export function unauthorized(message: any) {
  return errorResponse(401, message);
}

export function forbidden(message: any) {
  return errorResponse(403, message);
}

export function notFound(message: any) {
  return errorResponse(404, message);
}
