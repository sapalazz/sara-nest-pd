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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from 'src/roles.decorator';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
// using this interceptor we will see this standard output for each request:
// "Before...
// After... 1ms"
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  // only users with the admin role can access this route
  @Roles(['admin'])
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
