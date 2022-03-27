import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MONGODB_CONNECTION_CONFIG } from '@/configs/mongo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...MONGODB_CONNECTION_CONFIG,
      entities: [join(__dirname, 'entities/*.entity{.ts,.js}')],
    }),
  ],
})
export class MongoModule {}
