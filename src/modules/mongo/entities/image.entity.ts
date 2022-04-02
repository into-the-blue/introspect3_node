import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { AddCreatedAtUpdatedAt } from './entityListener';
import { IntroImageSource, UnsplashMetadata } from '@/types/image.type';

@Entity({ name: 'images' })
export class ImageEntity extends AddCreatedAtUpdatedAt {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectID;

  @Column({ type: 'string' })
  source: IntroImageSource;

  @Column({ type: 'string' })
  imageUrl: string;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ nullable: true })
  unsplashInfo: UnsplashMetadata;

  @Column({ type: 'double', nullable: true })
  size?: number;

  @Column({ type: 'string', nullable: true })
  mime?: string;
}
