/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // GET /cats?age=2&breed=siamese
  // Would result in age being 2 and breed being siamese
  @Get()
  async findAll(@Query('age') age: number, @Query('breed') breed: string) {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw (
        new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a a custom error',
          },
          HttpStatus.FORBIDDEN,
        ),
        {
          cause: error,
        }
      );
    }
  }

  /*
  @Get()
  async findAll() {
    throw new ForbiddenException();
  }
  */

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
