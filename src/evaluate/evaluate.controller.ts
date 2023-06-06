import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EvaluateCreateDto } from './dto/EvaluateCreate.dto';
import { EvaluateService } from './evaluate.service';
import { EvaluateUpdateDto } from './dto/EvaluateUpdate.dto';
import { QuerySearchEvaluateDto } from './dto/QuerySearchEvaluate.dto';

@ApiTags('evaluate')
@Controller('evaluate')
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @Post('/create')
  async createEvaluate(@Body() body: EvaluateCreateDto) {
    return await this.evaluateService.createEvaluate(body);
  }

  @Put('/update')
  async updateEvaluate(@Body() body: EvaluateUpdateDto) {
    return await this.evaluateService.updateEvaluate(body);
  }

  @Get('/list')
  async getListEvaluate(@Query() query: QuerySearchEvaluateDto) {
    return await this.evaluateService.getListEvaluate(query);
  }

  @Get('/:id/detail')
  async getDetailEvaluate(@Param('id') id: string) {
    return await this.evaluateService.getDetailEvaluate(id);
  }

  @Delete('/:id/delete')
  async deleteEvaluate(@Param('id') id: string) {
    return await this.evaluateService.deleteEvaluate(id);
  }
}
