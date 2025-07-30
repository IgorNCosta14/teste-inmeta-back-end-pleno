import { Router } from "express";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateDocumentController } from "../../app/document/controllers/CreateDocument.controller";
import { CreateMultipleDocumentsBodyDto } from "../../app/document/dtos/CreateDocumentBody.dto";


const documentRouter = Router();

const createDocumentController = new CreateDocumentController();

documentRouter.post('/', createValidationMiddleware(CreateMultipleDocumentsBodyDto), createDocumentController.handle);

export { documentRouter };