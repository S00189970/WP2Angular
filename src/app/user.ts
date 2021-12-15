export interface User {
    _id: String
    firstName: string,
    lastName: string,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: string
}
    