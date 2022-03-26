import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV_VARS } from './env';

export const MONGODB_CONNECTION_CONFIG: TypeOrmModuleOptions = {
  database: ENV_VARS.MONGO_DBNAME,
  password: ENV_VARS.MONGO_PASSWORD,
  username: ENV_VARS.MONGO_USERNAME,
  host: ENV_VARS.MONGO_HOST,
  port: +ENV_VARS.MONGO_PORT,
};
