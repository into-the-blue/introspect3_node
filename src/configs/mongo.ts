import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV_VARS } from './env';

export const MONGODB_CONNECTION_CONFIG: TypeOrmModuleOptions = {
  type: 'mongodb',
  database: ENV_VARS.MONGO_DBNAME,
  password: ENV_VARS.MONGO_PASSWORD,
  username: ENV_VARS.MONGO_USERNAME,
  host: ENV_VARS.MONGO_HOST,
  port: +ENV_VARS.MONGO_PORT,
  authSource: 'admin',
  useUnifiedTopology: true,
};
