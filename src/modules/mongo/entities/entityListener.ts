import { Column } from 'typeorm';
export class AddCreatedAtUpdatedAt {
  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;
}
