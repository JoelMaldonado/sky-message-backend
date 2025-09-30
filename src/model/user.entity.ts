import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageBatch } from './message-batch.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  passwordHash: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => MessageBatch, (batch) => batch.user)
  batches: MessageBatch[];
}
