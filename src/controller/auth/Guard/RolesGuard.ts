import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../helper/enums';
import { ROLES_KEY } from '../../../decorator/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const headers = req.headers;
    const authHeader = headers['authorization'].substring(7);
    const payload = this.jwtService.decode(authHeader);
    return requiredRoles.some((role) => payload['roles']?.includes(role));
  }
}
