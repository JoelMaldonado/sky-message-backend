export class CreateBatchDto {
    originalTemplate: string;
    messages: CreateMessageDto[];
}

export class CreateMessageDto {
    clientName: string;
    clientPhone: string;
}