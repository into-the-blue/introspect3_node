import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MONGODB_CONNECTION_CONFIG } from '@/configs/mongo';
import { join } from 'path';
import { DefaultEntitySubscriber } from './entity.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...MONGODB_CONNECTION_CONFIG,
      entities: [join(__dirname, 'entities/*.entity{.ts,.js}')],
    }),
  ],
  providers: [DefaultEntitySubscriber],
})
export class MongoModule {}
