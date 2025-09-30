import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageBatch } from './message-batch.entity';
import { MessageStatus } from './message-status.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'client_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  clientName: string;

  @Column({
    name: 'client_phone',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  clientPhone: string;

  @Column({
    name: 'final_message',
    type: 'text',
    nullable: false,
  })
  finalMessage: string;

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

  @JoinColumn({ name: 'batch_id' })
  @ManyToOne(() => MessageBatch, (batch) => batch.messages, {
    onDelete: 'CASCADE',
  })
  batch: MessageBatch;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => MessageStatus, (status) => status.messages)
  status: MessageStatus;
}
