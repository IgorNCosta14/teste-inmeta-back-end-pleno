import { inject, injectable } from "tsyringe";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { CreateDocumentTypeDto } from "../dtos/CreateDocumentType.dto";
import { DocumentType } from "../entities/DocumentType.entity";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";

@injectable()
export class CreateDocumentTypeUseCase {
    constructor(
        @inject('DocumentTypeRepository')
        private readonly documentTypeRepository: IDocumentTypeRepository
    ) { }

    async execute({
        name
    }: CreateDocumentTypeDto): Promise<DocumentType> {
        const nameAlreadyInUse = await this.documentTypeRepository.getByName(name)

        if (nameAlreadyInUse) throw new ErrorHandler("Name is already in use", 422)

        return await this.documentTypeRepository.create({
            name
        })
    }
}