import { Document } from "../../../app/document/entities/Document.entity";
import { DocumentStatus } from "../../../app/document/enums/DocumentStatus.enum";
import { IDocumentRepository } from "../../../app/document/repositories/IDocumentRepository";
import { SendDocumentUseCase } from "../../../app/document/useCases/SendDocument.useCase";

describe('SendDocumentUseCase', () => {
    let sendDocumentUseCase: SendDocumentUseCase;
    let documentRepository: jest.Mocked<IDocumentRepository>;

    beforeEach(() => {
        documentRepository = {
            getById: jest.fn(),
            update: jest.fn()
        } as any;

        sendDocumentUseCase = new SendDocumentUseCase(documentRepository);
    });

    it('should be able to save a url on a document', async () => {
        const input = {
            id: "valid-document-id",
            url: "url",
        };

        const date = new Date();

        const existingDocument = {
            id: input.id,
            name: "documento-name",
            url: null,
            status: DocumentStatus.PENDING,
            createdAt: date,
            updatedAt: date,
            deletedAt: null,
            employee: {} as any,
            documentType: {} as any,
        } as Document;

        const updatedDocument = {
            ...existingDocument,
            url: input.url,
            status: DocumentStatus.SENT,
        };

        documentRepository.getById.mockResolvedValue(existingDocument);
        documentRepository.update.mockResolvedValue(updatedDocument);

        const result = await sendDocumentUseCase.execute(input);

        expect(documentRepository.getById).toHaveBeenCalledWith(input.id);
        expect(documentRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: input.id,
            url: input.url,
            status: DocumentStatus.SENT
        }));
        expect(result).toEqual(updatedDocument);
    })

    it('should throw an error if the document is not found', async () => {
        const input = {
            id: "invalid-document-id",
            url: "url",
        };

        documentRepository.getById.mockResolvedValue(null);

        await expect(
            sendDocumentUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "Document not found",
            statusCode: 404
        });
    })

    it('should throw an error if the document has already been sent', async () => {
        const input = {
            id: "valid-document-id",
            url: "url",
        };

        const date = new Date();

        const existingDocument = {
            id: input.id,
            name: "documento-name",
            url: "url",
            status: DocumentStatus.SENT,
            createdAt: date,
            updatedAt: date,
            deletedAt: null,
            employee: {} as any,
            documentType: {} as any,
        } as Document;

        documentRepository.getById.mockResolvedValue(existingDocument);

        await expect(
            sendDocumentUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "Document has already been sent",
            statusCode: 409
        });
    })
})