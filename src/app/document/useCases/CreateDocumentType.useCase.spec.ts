import { DocumentType } from "../entities/DocumentType.entity";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { CreateDocumentTypeUseCase } from "./CreateDocumentType.useCase";

describe('CreateDocumentTypeUseCase', () => {
    let createDocumentTypeUseCase: CreateDocumentTypeUseCase;
    let documentTypeRepository: jest.Mocked<IDocumentTypeRepository>;

    beforeEach(() => {
        documentTypeRepository = {
            getByName: jest.fn(),
            create: jest.fn()
        } as any;

        createDocumentTypeUseCase = new CreateDocumentTypeUseCase(documentTypeRepository);
    });

    it('should be able to create a new document type', async () => {
        const input = "document-type-name"

        documentTypeRepository.getByName.mockResolvedValue(null);

        await createDocumentTypeUseCase.execute({
            name: input
        });

        expect(documentTypeRepository.getByName).toHaveBeenCalledWith(input);
        expect(documentTypeRepository.create).toHaveBeenCalledWith({ name: input });
    })

    it('should throw an error if the name of the document type is already in use', async () => {
        const input = "document-type-name-already-in-use"

        documentTypeRepository.getByName.mockResolvedValue({
            id: 'id-document-type-name-already-in-use'
        } as DocumentType);

        await expect(
            createDocumentTypeUseCase.execute({
                name: input
            })
        ).rejects.toMatchObject({
            message: "Name is already in use",
            statusCode: 422
        });
    })
})