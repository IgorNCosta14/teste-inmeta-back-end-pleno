import { DocumentType } from "../../../app/document/entities/DocumentType.entity";
import { IDocumentTypeRepository } from "../../../app/document/repositories/IDocumentTypeRepository";
import { ListDocumentTypeUseCase } from "../../../app/document/useCases/ListDocumentType.useCase";

describe('ListDocumentTypeUseCase', () => {
    let listDocumentTypeUseCase: ListDocumentTypeUseCase;
    let documentTypeRepository: jest.Mocked<IDocumentTypeRepository>;

    beforeEach(() => {
        documentTypeRepository = {
            listActive: jest.fn()
        } as any;

        listDocumentTypeUseCase = new ListDocumentTypeUseCase(documentTypeRepository);
    });

    it('should be able to list document types', async () => {
        const mockDocumentTypes = [
            {
                id: 'valid-document-type-id-1',
                name: 'document-name-1',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                documents: []
            } as DocumentType,
            {
                id: 'valid-document-type-id-2',
                name: 'document-name-2',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                documents: []
            } as DocumentType
        ];

        documentTypeRepository.listActive.mockResolvedValue(mockDocumentTypes);

        const result = await listDocumentTypeUseCase.execute();

        expect(documentTypeRepository.listActive).toHaveBeenCalled();
        expect(result).toEqual(mockDocumentTypes);
    });
})