import { inject, injectable } from "tsyringe";
import { SendDocumentDto } from "../dtos/SendDocument.dto";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { DocumentStatus } from "../enums/DocumentStatus.enum";

@injectable()
export class SendDocumentUseCase {
    constructor(
        @inject('DocumentRepository')
        private readonly documentRepository: IDocumentRepository
    ) { }

    async execute({ id, url }: SendDocumentDto): Promise<any> {
        let document = await this.documentRepository.getById(id);

        if (!document) throw new ErrorHandler("Document not found", 404);

        if (document.status === DocumentStatus.SENT) throw new ErrorHandler("Document has already been sent", 409);

        document.url = url;
        document.status = DocumentStatus.SENT

        const updatedDocument = await this.documentRepository.update(document);

        return updatedDocument;
    }
}