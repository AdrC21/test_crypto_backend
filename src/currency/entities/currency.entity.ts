import { Criptomoneda } from 'src/cryptocurrency/entities/cryptocurrency.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn, CreateDateColumn, ManyToMany } from 'typeorm';


@Entity()
export class Moneda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',nullable:false, unique: true})
    @Index()
    cod:string

    @Column({type:'varchar',nullable:false})
    name:string

    @Column({type:'varchar',nullable:false})
    symbol:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => Criptomoneda, (criptomoneda) => criptomoneda.monedas)
    criptomonedas: Criptomoneda[];
}
