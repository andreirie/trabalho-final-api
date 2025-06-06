import Core from '../../../cores/typeorm/entities/Core';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('processors')
export default class Processor{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() 
    model_name: string;
    @Column() 
    manufacturer: string;
    @Column() 
    architecture: string;
    @Column('int')
    total_cache: number;
    @Column('decimal', { precision: 5, scale: 2 })
    base_clock_speed: number;
    @OneToMany(() => Core, core => core.processor)
    cores: Core[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
