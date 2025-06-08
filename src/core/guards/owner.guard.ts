import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TypeUser } from 'src/users/entity/enumtypeuser';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = parseInt(request.params.id, 10);

    if(user.id === userId || user.type === TypeUser.ADMIN) {
      return true;
    }

    throw new ForbiddenException('Only the owner can access this resource');

  }
}