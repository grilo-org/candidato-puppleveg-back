export interface Hasher{
    compare(password: string, hashedPassword: string): Promise<boolean>
}