import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TypeUser } from 'src/users/entity/enumtypeuser';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    
    if (user.type !== TypeUser.ADMIN) {
      throw new ForbiddenException('Only admins can access this resource');
    }
    
    return true;
  }
}