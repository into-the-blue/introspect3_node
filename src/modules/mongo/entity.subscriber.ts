import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Connection,
} from 'typeorm';
import { Logger } from '../logger/logger.service';

@EventSubscriber()
export class DefaultEntitySubscriber implements EntitySubscriberInterface {
  constructor(connection: Connection, private logger: Logger) {
    connection.subscribers.push(this);
  }
  beforeInsert(event: InsertEvent<any>): void | Promise<any> {
    event.entity.createdAt = new Date();
    event.entity.updatedAt = new Date();
  }

  // only works for repo.save
  // beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
  //   event.entity.updatedAt = new Date();
  //   this.logger.debug(event.entity);
  // }
}
