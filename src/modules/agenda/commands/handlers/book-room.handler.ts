import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../book-room.command";
import { RoomRepository } from "../../repositories/room.repository";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "types/@nestjs/common";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(
        private readonly repository: RoomRepository
    ) { }

    async execute(command: BookRoomCommand): Promise<any> {
        const room = await this.repository.checkAvailability(command.roomId, command.date)

        if (room) {
            room.book(command.customerId, command.date);
            await this.repository.book(room);
            return;
        }

        throw new HttpException("Sala nao disponivel", HttpStatus.BAD_REQUEST);
    }
}