import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";
import { RoomRepository } from "../repositories/room.repository";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {   
    constructor(
        private readonly repository: RoomRepository 
    ) { }    

    async execute(command: BookRoomCommand): Promise<any> {
        const room = await this.repository.findOneById(command.roomId)
        room.book(command.customerId);
    }
}