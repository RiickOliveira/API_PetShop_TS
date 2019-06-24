import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../book-room.command";
import { RoomRepository } from "../../repositories/room.repository";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {   
    constructor(
        private readonly repository: RoomRepository 
    ) { }    

    async execute(command: BookRoomCommand): Promise<any> {
        console.log('BookRoomHandler -- executando o handler')

        const room = await this.repository.findOneById(command.roomId)
        room.book(command.customerId);
    }
}