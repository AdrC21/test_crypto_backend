import { Moneda } from 'src/currency/entities/currency.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Criptomoneda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',nullable:false})
    name:string

    @Column({type:'varchar',nullable:false})
    @Index()
    symbol:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => Moneda, (moneda) => moneda.criptomonedas)
    @JoinTable({
        name: 'criptomoneda_moneda', // Tabla intermedia
        joinColumn: { 
            name: 'criptomonedaId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: { 
            name: 'monedaId',
            referencedColumnName: 'id',
        },
    })
    monedas: Moneda[]; // Lista de monedas asociadas a esta criptomoneda

}