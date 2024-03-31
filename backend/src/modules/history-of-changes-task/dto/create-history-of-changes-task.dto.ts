import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";


export class CreateHistoryOfChangesTaskDto
{
    @AutoMap()
    @ApiProperty({nullable: true })
    id: number;

    @AutoMap()
    @ApiProperty({nullable: true })
    description: string;

    @AutoMap()
    @ApiProperty({nullable: true })
    created_at: Date;

    @AutoMap()
    @ApiProperty({nullable: true })
    task_id: number;
}
