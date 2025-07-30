import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type Source = 'body' | 'query' | 'params';

function formatErrors(errors: ValidationError[]): any[] {
    const formatted: any[] = [];

    for (const error of errors) {
        if (error.children && error.children.length > 0) {
            const nestedErrors = formatErrors(error.children);
            nestedErrors.forEach((nested) => {
                formatted.push({
                    field: `${error.property}.${nested.field}`,
                    constraints: nested.constraints,
                });
            });
        } else {
            formatted.push({
                field: error.property,
                constraints: error.constraints,
            });
        }
    }

    return formatted;
}

export function createValidationMiddleware<T extends object>(
    dtoClass: new () => T,
    source: Source = 'body'
) {
    return async (req: any, res: any, next: any) => {
        try {
            const rawData = req[source] ?? {};
            const instance = plainToInstance(dtoClass, rawData);
            const errors = await validate(instance, { whitelist: true, forbidUnknownValues: true });

            if (errors.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Validation failed',
                    errors: formatErrors(errors),
                });
            }

            return next();
        } catch (err) {
            console.error('Validation middleware error:', err);
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                stack: err,
            });
        }
    };
}
