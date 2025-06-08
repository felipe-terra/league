import { EntitySchema } from 'typeorm';
import { User } from '../entity/user';
import { TypeUser } from '../entity/enumtypeuser';


export const UserSchema = new EntitySchema<User>({
  name: 'users',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    active: {
      type: 'boolean',
      nullable: false,
    },
    type: {
      type: 'enum',
      enum: TypeUser,
      nullable: false,
      default: TypeUser.USER,
    },
    created_at: {
      type: 'timestamp',
      nullable: false,
    },
  },
});