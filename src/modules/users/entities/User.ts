import { v4 as uuidv4 } from 'uuid';
import { parseISO } from 'date-fns';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  avatar?: string | null;

  created_at: Date;

  updated_at: Date;

  constructor({ name, email, password }: Omit<User, "id" | "created_at" | "updated_at" | "avatar">) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = parseISO(Date());
    this.updated_at = parseISO(Date());
  }
}

export default User;
