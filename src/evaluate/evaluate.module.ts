import { Module } from '@nestjs/common';
import { EvaluateController } from './evaluate.controller';
import { EvaluateService } from './evaluate.service';
import { EvaluateRepository } from './repository/evaluate.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { evaluateSchema } from './model/evaluate.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Evaluate',
        schema: evaluateSchema,
      },
    ]),
  ],
  controllers: [EvaluateController],
  providers: [EvaluateService, EvaluateRepository],
})
export class EvaluateModule {}
