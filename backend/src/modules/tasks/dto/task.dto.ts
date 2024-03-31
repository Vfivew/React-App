import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnDto } from 'src/modules/task-columns/dto/column.dto';
import { Priority } from '../enums/priority.enum';

export class TaskDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  title: string;

  @AutoMap()
  @ApiProperty({ required: false })
  description?: string;

  @AutoMap()
  @ApiProperty()
  position: number;

  @AutoMap()
  @ApiProperty()
  created_at: Date;

  @AutoMap()
  @ApiProperty()
  updated_at: Date;

  @AutoMap()
  @ApiProperty()
  columnId: number;

  @AutoMap()
  @ApiProperty({ nullable: true })
  priority: Priority;

  @AutoMap()
  @ApiProperty({ nullable: true })
  due_date: Date;

  @AutoMap(() => ColumnDto)
  @ApiProperty({ type: () => ColumnDto })
  column: ColumnDto;
}
