import bcrypt from 'bcryptjs';

export async function hashPassword(password:string) {
  const saltRounds = 10; // Number of rounds to process the data
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password:string, hashedPassword:string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
