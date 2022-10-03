export interface HasherComparer{
    compare(password: string, hashedPassword: string): Promise<boolean>
}