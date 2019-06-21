import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {
    async findOneById(id: string): Promise<Room> {
        console.log('repository: findBYid');

        return new Room('231321321')
    }
}