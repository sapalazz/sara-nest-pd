import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { ApiBearerAuth as SwaggerApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: RolesGuard[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
function ApiBearerAuth(): ClassDecorator | MethodDecorator | PropertyDecorator {
  return SwaggerApiBearerAuth();
}
function ApiUnauthorizedResponse(options: {
  description: string;
}): ClassDecorator | MethodDecorator | PropertyDecorator {
  return applyDecorators(
    SetMetadata('swagger/apiResponse', {
      status: 401,
      description: options.description,
    }),
  );
}
