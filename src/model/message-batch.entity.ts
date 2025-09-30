import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';
import { MessageStatus } from './message-status.entity';

@Entity('message_batches')
export class MessageBatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'original_template',
    type: 'text',
    nullable: false,
  })
  originalTemplate: string;

  @Column({
    name: 'total',
    type: 'int',
  })
  total: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.batches, { onDelete: 'CASCADE' })
  user: User;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => MessageStatus)
  status: MessageStatus;

  @OneToMany(() => Message, (message) => message.batch)
  messages: Message[];
}
