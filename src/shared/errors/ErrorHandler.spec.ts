import { ErrorHandler } from "./ErrorHandler";

describe("ErrorHandler", () => {
    it("should create an error with message and statusCode", () => {
        const error = new ErrorHandler("Something went wrong", 404);

        expect(error.message).toBe("Something went wrong");
        expect(error.statusCode).toBe(404);
        expect(error.details).toBeUndefined();
    });

    it("should use the default statusCode when not provided", () => {
        const error = new ErrorHandler("Bad request");

        expect(error.message).toBe("Bad request");
        expect(error.statusCode).toBe(400);
        expect(error.details).toBeUndefined();
    });

    it("should include details if provided", () => {
        const details = { field: "email", issue: "invalid format" };
        const error = new ErrorHandler("Validation failed", 422, details);

        expect(error.message).toBe("Validation failed");
        expect(error.statusCode).toBe(422);
        expect(error.details).toEqual(details);
    });
});