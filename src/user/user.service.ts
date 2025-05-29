import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/common/auth/auth.service';


@Injectable()
export class UserService {

  constructor(
         @InjectRepository(User) 
         private userRepository: Repository<User>,
         private authService: AuthService 
    ){}


  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Verificar si el email ya existe
    const findUserEdmail = await this.userRepository.findOneBy({ email });
    if (findUserEdmail) {
      throw new ConflictException('Email ya registrado');
    }

    // Hashear la contraseña
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    //Creacion del nuevo usuario
    const newUser = this.userRepository.create({email, password: hashedPassword})
    const user= await this.userRepository.save(newUser);

    return {
      msg:'Usuario creado exitosamente', 
      session: user
    }

  }

  async login(loginDto: LoginDto){
    const {email, password} = loginDto

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
        throw new NotFoundException('Este correo no se encuantra registrado'); // Usuario no encontrado
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales Invalidas'); // Contraseña incorrecta
    }
    
    // Si las credenciales son válidas, generar el token JWT
    // El payload del token debe contener información mínima necesaria para identificar al usuario
    const payload = { sub: user.id, email: user.email }; // 'sub' es una convención común (subject)

    const token = await this.authService.generateToken(payload, '24h')
    
    return {
      msg:'Session creada exitosamente', 
      token: token
    }

  }

}
