import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {
    async checkAvailability(id: string, date: Date): Promise<Room> {
        //Ler do banco
        return new Room('231321321')
    }

    async book(room: Room) {
        //Salvar no banco
    }
}