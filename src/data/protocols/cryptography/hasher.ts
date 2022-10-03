export interface Hasher{
    hash(hash: string): Promise<string>
}