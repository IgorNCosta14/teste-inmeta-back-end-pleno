import { Router } from "express";
import { CreateDocumentTypeController } from "../../app/document/controllers/CreateDocumentType.controller";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateDocumentTypeBodyDto } from "../../app/document/dtos/CreateDocumentTypeBody.dto";
import { DeleteDocumentTypeParamsDto } from "../../app/document/dtos/DeleteDocumentTypeParams.dto";
import { DeleteDocumentTypeController } from "../../app/document/controllers/DeleteDocumentType.controller";
import { ListDocumentTypeController } from "../../app/document/controllers/ListDocumentType.controller";


const documentTypeRouter = Router();

const createDocumentTypeController = new CreateDocumentTypeController();
const deleteDocumentTypeController = new DeleteDocumentTypeController();
const listDocumentTypeController = new ListDocumentTypeController();

documentTypeRouter.post('/', createValidationMiddleware(CreateDocumentTypeBodyDto), createDocumentTypeController.handle);
documentTypeRouter.get('/', listDocumentTypeController.handle);
documentTypeRouter.delete('/:id', createValidationMiddleware(DeleteDocumentTypeParamsDto, 'params'), deleteDocumentTypeController.handle);

export { documentTypeRouter };