import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Criptomoneda } from './entities/cryptocurrency.entity';
import { In, Repository } from 'typeorm';
import { CurrencyService } from 'src/currency/currency.service';
import { Moneda } from 'src/currency/entities/currency.entity';

@Injectable()
export class CryptocurrencyService {

  constructor(
    @InjectRepository(Criptomoneda)
    private criptomonedaRepository: Repository<Criptomoneda>,
    @InjectRepository(Moneda)
    private monedaRepository: Repository<Moneda>,
    private currencyService: CurrencyService
  ) { }

  async create(createCryptocurrencyDto: CreateCryptocurrencyDto): Promise<Criptomoneda> {
    const { symbol, name, monedas } = createCryptocurrencyDto;

    // Verificar unicidad del símbolo
    const symbolUpperCase = symbol.toUpperCase();
    const existingCrypto = await this.criptomonedaRepository.findOneBy({ symbol: symbolUpperCase });
    if (existingCrypto) {
      throw new ConflictException(`Criptomoneda con símbolo "${symbolUpperCase}" ya existe.`);
    }

    // Buscar las monedas asociadas por sus códigos
    const monedasToAssociate = await this.currencyService.findByIds(monedas); // Usar el método del servicio Moneda

    // Verificar si se encontraron todas las monedas
    if (monedasToAssociate.length == 0) {
      throw new BadRequestException(`Monedas no encontradas para asociar`);
    }

    // Crear la criptomoneda
    const newCriptomoneda = this.criptomonedaRepository.create({
      symbol: symbolUpperCase,
      name,
      monedas: monedasToAssociate, // Asignar las entidades Moneda encontradas
    });

    return this.criptomonedaRepository.save(newCriptomoneda);
  }

  async findAllOrFiltered(monedaCode?: string) {
    console.log('monedaCode:',monedaCode)
    if (monedaCode) {

      const moneda = await this.monedaRepository.findOne({ 
        where: { cod: monedaCode.toUpperCase() },
        relations: ['criptomonedas'], // Cargar la relación inversa
      });

      if (!moneda) {
        return [];
      }

      return this.criptomonedaRepository.createQueryBuilder('cripto')
        .leftJoinAndSelect('cripto.monedas', 'moneda')
        .where('moneda.codigo = :code', { code: monedaCode.toUpperCase() })
        .getMany();
    } else {
      return this.criptomonedaRepository.find({
        relations: ['monedas'],
      });
    }
  }

  async update(id: number, updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    const crypto = await this.criptomonedaRepository.findOne({
      where: { id },
      relations: ['monedas'],
    })
    if (!crypto) {
      throw new HttpException('Criptomoneda no encontrada', HttpStatus.NOT_FOUND)
    }

    let monedas = crypto.monedas;
    if (updateCryptocurrencyDto.monedas && updateCryptocurrencyDto.monedas.length > 0) {
      monedas = await this.monedaRepository.findBy({
        id: In(updateCryptocurrencyDto.monedas),
      });
    }
    // Mezclamos los datos existentes con los actualizados
    const updatedCrypto = this.criptomonedaRepository.merge(crypto, {
      ...updateCryptocurrencyDto,
      monedas,
    });

    const cryto = this.criptomonedaRepository.save(updatedCrypto);

    return {
      msg: 'Criptomoneda Actualizada exitosamente',
      cryto
    }
  }


}
