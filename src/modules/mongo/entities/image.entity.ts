import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { TImageSource } from '@/types/image.type';

@Entity({ name: 'images' })
export class ImageEntity {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectID;

  @Column({ type: 'string' })
  source: TImageSource;

  @Column({ type: 'string', name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'double', nullable: true })
  size?: number;

  @Column({ type: 'string', nullable: true })
  mime?: string;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'date', name: 'updated_at' })
  updatedAt: Date;
}
