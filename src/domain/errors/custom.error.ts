import { measureMemory } from "vm";


export class CustomerError extends Error {
    constructor(public readonly statusCode: number,
        public readonly message:string )
    {
        super(message);
    } 

    static badRequest(message: string) {
        return new CustomerError(400, message);
    }
    static unauthorized(message: string) {
        return new CustomerError(401, message);
    }
    static forbidden(message: string) {
        return new CustomerError(403, message);
    }
    static notFound(message: string) {
        return new CustomerError(404, message);
    }
    static internalServer(message: string='Internal Server Error') {
        return new CustomerError(500, message);
    }

 
}