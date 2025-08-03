import { Document } from "../../../app/document/entities/Document.entity";
import { IDocumentRepository } from "../../../app/document/repositories/IDocumentRepository";
import { IDocumentTypeRepository } from "../../../app/document/repositories/IDocumentTypeRepository";
import { DeleteDocumentUseCase } from "../../../app/document/useCases/DeleteDocument.useCase";

describe('DeleteDocumentUseCase', () => {
    let deleteDocumentUseCase: DeleteDocumentUseCase;
    let documentRepository: jest.Mocked<IDocumentRepository>;

    beforeEach(() => {
        documentRepository = {
            getById: jest.fn(),
            delete: jest.fn()
        } as any;

        deleteDocumentUseCase = new DeleteDocumentUseCase(documentRepository);
    });

    it('should be able to delete one or many documents', async () => {
        const input: string[] = [
            "valid-document-id-1",
            "valid-document-id-2",
        ];

        documentRepository.getById
            .mockResolvedValueOnce({ id: input[0] } as Document)
            .mockResolvedValueOnce({ id: input[1] } as Document);

        await deleteDocumentUseCase.execute(input);

        expect(documentRepository.getById).toHaveBeenNthCalledWith(1, input[0]);
        expect(documentRepository.getById).toHaveBeenNthCalledWith(2, input[1]);
        expect(documentRepository.delete).toHaveBeenCalledWith(input)
    })

    it('should throw an error if the input array is empty', async () => {
        const input: string[] = [];

        await expect(
            deleteDocumentUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "No document IDs provided",
            statusCode: 400
        });
    })

    it('should throw an error if one or more document IDs are not found', async () => {
        const input: string[] = [
            "not-found-id-1",
            "not-found-id-2"
        ];

        documentRepository.getById
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(null);

        await expect(
            deleteDocumentUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "Documents not found",
            statusCode: 404,
            details: {
                idsNotFound: ["not-found-id-1", "not-found-id-2"]
            }
        });
    });

})