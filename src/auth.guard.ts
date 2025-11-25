import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
// every guard must implement a CanActivate function,
// it should return a boolean indicating whether the current request is allowed or not
// returns true: request is processed
// returns false: nest denies the request

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(request: any): boolean {
  // Check if Authorization header exists
  const authHeader = request.headers?.authorization;

  if (!authHeader) {
    return false;
  }

  // Check if it's a Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return false;
  }

  // Extract token
  const token = authHeader.substring(7);

  // Basic token validation (not empty)
  return token && token.length > 0;
}
