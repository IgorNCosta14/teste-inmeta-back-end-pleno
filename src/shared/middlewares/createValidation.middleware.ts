
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type Source = 'body' | 'query' | 'params';

export function createValidationMiddleware<T extends object>(
    dtoClass: new () => T,
    source: Source = 'body'
) {
    if (!dtoClass) {
        throw new Error('dtoClass must be provided to the validation middleware.');
    }

    return async (req: any, res: any, next: any) => {
        try {
            const rawData = req[source] ?? {};

            const instance = plainToInstance(dtoClass, rawData);
            const errors = await validate(instance);

            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.map((err) => ({
                        field: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // req.validatedQuery = instance;

            return next();
        } catch (err) {
            console.error('Validation middleware error:', err);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err instanceof Error ? err.message : String(err),
            });
        }
    };
}
