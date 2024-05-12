import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CoreModule } from './modules/core.module';
import { FeatureModule } from './modules/feature.module';

@Module({
  imports: [CoreModule, FeatureModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
