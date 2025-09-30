import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('message_status')
export class MessageStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Message, (message) => message.status)
  messages: Message[];
}
