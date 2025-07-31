import { Router } from "express";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateDocumentController } from "../../app/document/controllers/CreateDocument.controller";
import { CreateMultipleDocumentsBodyDto } from "../../app/document/dtos/CreateDocumentBody.dto";
import { GetDocumentsController } from "../../app/document/controllers/GetDocuments.controller";
import { GetDocumentsQueryDto } from "../../app/document/dtos/GetDocumentsQuery.dto";


const documentRouter = Router();

const createDocumentController = new CreateDocumentController();
const getDocumentsController = new GetDocumentsController();

documentRouter.post('/', createValidationMiddleware(CreateMultipleDocumentsBodyDto), createDocumentController.handle);
documentRouter.get('/', createValidationMiddleware(GetDocumentsQueryDto, 'query'), getDocumentsController.handle);

export { documentRouter };