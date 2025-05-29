import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moneda } from './entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
        @InjectRepository(Moneda)
        private currencyRepository: Repository<Moneda>,
    ) {}


  async create(createCurrencyDto: CreateCurrencyDto) {
    const { cod, name, symbol } = createCurrencyDto;

    // Convertir código a mayúsculas y verificar unicidad
    const codUpperCase = cod.toUpperCase();
    const currency = await this.currencyRepository.findOneBy({ cod: codUpperCase });
    if (currency) {
      throw new ConflictException(`Ya existe una moneda con código "${codUpperCase}".`);
    }

    const newCurrency = this.currencyRepository.create({
      cod: codUpperCase,
      name,
      symbol,
    });

    const moneda = await this.currencyRepository.save(newCurrency)

    return {
      msg:'Moneda creada con exito',
      moneda: moneda
    }
  }


  async findAll(): Promise<Moneda[]> {
    // Encuentra todas las monedas. No cargamos la relación criptomonedas por defecto para no sobrecargar
    return this.currencyRepository.find();
  }

  async findByIds(ids: number[]){
    return this.currencyRepository.findByIds(ids);
  }
  
}
