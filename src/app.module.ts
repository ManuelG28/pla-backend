import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { accessSecretVersion } from './config/secretmanager.config';
import { LoggerMiddleware } from './middleware/logger';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    accessSecretVersion('projects/964659245205/secrets/DATABASE/versions/1');
  }
}