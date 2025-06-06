import Processor from '../../../processors/typeorm/entities/Processor'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cores')
export default class Core{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Processor, { onDelete: 'CASCADE' })
  @JoinColumn({name: "processor_id"})
  processor: Processor;
  @Column('int')
  index: number;
  @Column()
  type: string;
  @Column('decimal', { precision: 5, scale: 2 })
  max_clock_speed: number;
  @Column('int')
  local_cache: number;
  @Column('boolean')
  multithreading: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
