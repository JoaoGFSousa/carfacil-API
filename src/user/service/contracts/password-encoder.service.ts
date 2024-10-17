export abstract class PasswordEncoder {
  abstract encode(password: string): Promise<string>;
  abstract matches(password: string, hash: string): Promise<boolean>;
}
