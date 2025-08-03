declare namespace Express {
    interface Request<T = any> {
        validatedBody?: any;
        validatedQuery?: any;
        validatedParams?: any;
    }
}