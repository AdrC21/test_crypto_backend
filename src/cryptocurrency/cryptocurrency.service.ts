import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from './dto/update-cryptocurrency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Criptomoneda } from './entities/cryptocurrency.entity';
import { Repository } from 'typeorm';
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

  async findAllOrFiltered(monedaCode?: string): Promise<Criptomoneda[]> {
    if (monedaCode) {

      const moneda = await this.monedaRepository.findOne({ 
        where: { cod: monedaCode.toUpperCase() },
        relations: ['criptomonedas'], // Cargar la relación inversa
      });

      if (!moneda) {
        // Podrías lanzar un error 404 si la moneda no existe
        // throw new NotFoundException(`Moneda con código "${monedaCode}" no encontrada`);
        // O simplemente retornar un array vacío si no hay criptos para esa moneda
        return [];
      }

      // Moneda encontrada, retornar sus criptomonedas asociadas
      // Necesitas asegurar que la relación 'monedas' en Criptomoneda también se carga
      // Una mejor manera es usar QueryBuilder
      return this.criptomonedaRepository.createQueryBuilder('cripto')
        .leftJoinAndSelect('cripto.monedas', 'moneda')
        .where('moneda.codigo = :code', { code: monedaCode.toUpperCase() })
        .getMany(); // Obtener la lista de criptomonedas
    } else {
      // Lógica para listar todas las criptomonedas con sus relaciones
      return this.criptomonedaRepository.find({
        relations: ['monedas'], // Cargar la relación Muchos a Muchos
      });
    }
  }

  findAll() {
    return `This action returns all cryptocurrency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptocurrency`;
  }

  update(id: number, updateCryptocurrencyDto: UpdateCryptocurrencyDto) {
    return `This action updates a #${id} cryptocurrency`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptocurrency`;
  }
}
