import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EvaluateRepository } from './repository/evaluate.repository';
import { EvaluateCreateDto } from './dto/EvaluateCreate.dto';
import { EvaluateUpdateDto } from './dto/EvaluateUpdate.dto';
import { QuerySearchEvaluateDto } from './dto/QuerySearchEvaluate.dto';

@Injectable()
export class EvaluateService {
  constructor(private readonly evaluateRepository: EvaluateRepository) {}

  async createEvaluate(body: EvaluateCreateDto) {
    try {
      const res = await this.evaluateRepository.create(body);
      return {
        status: HttpStatus.OK,
        data: res,
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }

  async updateEvaluate(body: EvaluateUpdateDto) {
    const { id, ...updateDtoData } = body;

    const updateDataResponse = await this.evaluateRepository
      .findByIdAndUpdate(id, {
        ...updateDtoData,
      })
      .then((res) => {
        return {
          success: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          success: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return updateDataResponse;
  }

  async getListEvaluate(query: QuerySearchEvaluateDto) {
    const { page = 1, limit = 10, name } = query;

    const skip = Number(limit) * Number(page) - Number(limit);

    let querySearch = {};

    if (name) {
      querySearch['name'] = { $regex: '.*' + name + '.*', $options: 'i' };
    }

    const countRecord = await this.evaluateRepository.countDocuments(
      querySearch,
    );

    const result = await this.evaluateRepository.getByCondition(
      querySearch,
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
    );

    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
    };
  }

  async getDetailEvaluate(id: string) {
    try {
      return await this.evaluateRepository.findById(id);
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.NOT_FOUND);
    }
  }

  async deleteEvaluate(id: string) {
    try {
      await this.evaluateRepository.deleteOne(id);

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }
}
