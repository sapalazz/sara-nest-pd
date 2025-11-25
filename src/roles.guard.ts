/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}

// this function checks if the user roles match the required roles
// returns true if there is a match, false otherwise
function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  return requiredRoles.some((role) => userRoles.includes(role));
}
