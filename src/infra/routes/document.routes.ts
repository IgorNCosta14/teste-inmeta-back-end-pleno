import { Router } from "express";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateDocumentController } from "../../app/document/controllers/CreateDocument.controller";
import { CreateMultipleDocumentsBodyDto } from "../../app/document/dtos/CreateDocumentBody.dto";
import { GetDocumentsController } from "../../app/document/controllers/GetDocuments.controller";
import { GetDocumentsQueryDto } from "../../app/document/dtos/GetDocumentsQuery.dto";
import { DeleteDocumentController } from "../../app/document/controllers/DeleteDocument.controller";
import { DeleteDocumentBodyDto } from "../../app/document/dtos/DeleteDocumentBody.dto";
import { SendDocumentController } from "../../app/document/controllers/SendDocument.controller";
import { SendDocumentParamsDto } from "../../app/document/dtos/SendDocumentParams.dto";
import { SendDocumentBodyDto } from "../../app/document/dtos/SendDocumentBody.dto";


const documentRouter = Router();

const createDocumentController = new CreateDocumentController();
const getDocumentsController = new GetDocumentsController();
const deleteDocumentController = new DeleteDocumentController();
const sendDocumentController = new SendDocumentController();

documentRouter.post('/', createValidationMiddleware(CreateMultipleDocumentsBodyDto), createDocumentController.handle);
documentRouter.get('/', createValidationMiddleware(GetDocumentsQueryDto, 'query'), getDocumentsController.handle);
documentRouter.delete('/',
    createValidationMiddleware(DeleteDocumentBodyDto, 'body'),
    deleteDocumentController.handle
);
documentRouter.put('/:id/send',
    createValidationMiddleware(SendDocumentParamsDto, 'params'),
    createValidationMiddleware(SendDocumentBodyDto, 'body'),
    sendDocumentController.handle
)

export { documentRouter };