import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'test',
            signOptions: { expiresIn: '1h' }
        }),
    ],
    providers: [AuthService],
    exports: [
        AuthService
    ]
})
export class CommonModule { }
