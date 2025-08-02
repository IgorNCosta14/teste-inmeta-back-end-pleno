import { DocumentType } from "../entities/DocumentType.entity";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { DeleteDocumentTypeUseCase } from "./DeleteDocumentType.useCase";

describe('DeleteDocumentTypeUseCase', () => {
    let deleteDocumentTypeUseCase: DeleteDocumentTypeUseCase;
    let documentTypeRepository: jest.Mocked<IDocumentTypeRepository>;

    beforeEach(() => {
        documentTypeRepository = {
            getById: jest.fn(),
            delete: jest.fn()
        } as any;

        deleteDocumentTypeUseCase = new DeleteDocumentTypeUseCase(documentTypeRepository);
    });

    it('should be able to delete a document type', async () => {
        const input: string = "valid-document-type-id";

        documentTypeRepository.getById.mockResolvedValue({
            id: input
        } as DocumentType);

        await deleteDocumentTypeUseCase.execute(input);

        expect(documentTypeRepository.getById).toHaveBeenCalledWith(input);
        expect(documentTypeRepository.delete).toHaveBeenCalledWith(input)
    })

    it('should throw an error if the document type is not found', async () => {
        const input = "invalid-document-type-id"

        documentTypeRepository.getById.mockResolvedValue(null);

        await expect(
            deleteDocumentTypeUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "Document type not found",
            statusCode: 404
        });
    })
})