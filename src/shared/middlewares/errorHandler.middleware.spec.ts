import { errorHandler } from "./errorHandler.middleware";
import { ErrorHandler } from "../errors/ErrorHandler";
import { Request, Response, NextFunction } from "express";

describe("errorHandlerMiddleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {};
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            status: statusMock
        };
        next = jest.fn();
    });

    it("should handle ErrorHandler instances", () => {
        const error = new ErrorHandler("Not Found", 404, { id: "not-found" });

        errorHandler(error, req as Request, res as Response, next);

        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({
            status: 404,
            message: "Not Found",
            errors: { id: "not-found" }
        });
    });

    it("should handle generic errors", () => {
        const error = new Error("Unexpected failure");
        error.stack = "fake-stack-trace";

        errorHandler(error, req as Request, res as Response, next);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({
            status: 500,
            message: "Internal server error - Unexpected failure",
            stack: "fake-stack-trace"
        });
    });

    it("should handle ErrorHandler without details", () => {
        const error = new ErrorHandler("Bad Request", 400);

        errorHandler(error, req as Request, res as Response, next);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({
            status: 400,
            message: "Bad Request",
            errors: undefined
        });
    });
});