import { Controller, Post, Body, UseGuards, Req, HttpException } from "@nestjs/common";
import { RoomBookService } from "../services/room-book.service";
import { BookRoomDto } from "../DTOs/book-room.dto";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { BookRoomCommand } from "../commands/book-room.command";
import { Result } from "src/modules/backoffice/models/result.model";
import { HttpStatus } from "types/@nestjs/common";

@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() req, @Body() model: BookRoomDto) {
       try {
           var command = new BookRoomCommand(req.user.document, model.roomId, model.date)
           await this.service.Book(command)
       } catch (error) {
           throw new HttpException(new Result('Nao foi possivel reservasr sua sala',false,null,error),HttpStatus.BAD_REQUEST);
       } 
       
    }
}
