export interface jwtInterface{
    token: (value: object) => Promise<string>
    verifyToken: (token: string) => any
}