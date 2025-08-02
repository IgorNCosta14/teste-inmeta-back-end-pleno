import { Type } from 'class-transformer';
import { createValidationMiddleware } from './createValidation.middleware';
import * as classValidator from 'class-validator';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class TestDto {
    @IsNotEmpty({ message: 'Field is required' })
    field!: string;
}

class ChildDto {
    @IsNotEmpty({ message: 'Nested field is required' })
    nestedField!: string;
}

class ParentDto {
    @ValidateNested()
    @Type(() => ChildDto)
    child!: ChildDto;
}

describe('createValidationMiddleware', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        next = jest.fn();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should pass validation and assign validatedBody', async () => {
        req = { body: { field: 'value' } };

        const middleware = createValidationMiddleware(TestDto, 'body');
        await middleware(req, res, next);

        expect(req.validatedBody).toBeInstanceOf(TestDto);
        expect(req.validatedBody.field).toBe('value');
        expect(next).toHaveBeenCalled();
    });

    it('should pass validation and assign validatedQuery', async () => {
        req = { query: { field: 'value' } };

        const middleware = createValidationMiddleware(TestDto, 'query');
        await middleware(req, res, next);

        expect(req.validatedQuery).toBeInstanceOf(TestDto);
        expect(req.validatedQuery.field).toBe('value');
        expect(next).toHaveBeenCalled();
    });

    it('should pass validation and assign validatedParams', async () => {
        req = { params: { field: 'value' } };

        const middleware = createValidationMiddleware(TestDto, 'params');
        await middleware(req, res, next);

        expect(req.validatedParams).toBeInstanceOf(TestDto);
        expect(req.validatedParams.field).toBe('value');
        expect(next).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
        req = { body: { field: '' } };

        const middleware = createValidationMiddleware(TestDto, 'body');
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            message: 'Validation failed',
            errors: [
                {
                    field: 'field',
                    constraints: { isNotEmpty: 'Field is required' }
                }
            ]
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle unexpected error and return 500', async () => {
        req = { body: { field: 'valid' } };

        jest.spyOn(classValidator, 'validate').mockImplementationOnce(() => {
            throw new Error('Unexpected error');
        });

        const middleware = createValidationMiddleware(TestDto, 'body');
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            message: 'Internal Server Error',
            stack: expect.any(Error),
        });
    });

    it('should return 400 and format nested validation errors', async () => {
        req = { body: { child: { nestedField: '' } } };

        const middleware = createValidationMiddleware(ParentDto, 'body');
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            message: 'Validation failed',
            errors: [
                {
                    field: 'child.nestedField',
                    constraints: { isNotEmpty: 'Nested field is required' }
                }
            ]
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should fallback to empty object if source data is undefined', async () => {
        req = {};

        const middleware = createValidationMiddleware(TestDto, 'body');
        await middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            message: 'Validation failed',
            errors: [
                {
                    field: 'field',
                    constraints: { isNotEmpty: 'Field is required' }
                }
            ]
        });
    });

    it('should use default source "body" if none is provided', async () => {
        req = { body: { field: 'value' } };

        const middleware = createValidationMiddleware(TestDto);
        await middleware(req, res, next);

        expect(req.validatedBody).toBeInstanceOf(TestDto);
        expect(next).toHaveBeenCalled();
    });

});
