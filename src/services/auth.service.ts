export function createUser(input: Partial<User>) {
    
    return UserModel.create(input);
  }
