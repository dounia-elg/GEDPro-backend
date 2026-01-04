import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('name') name: string,
        @Body('role') role?: UserRole,
    ) {
        return this.authService.register(email, password, name, role);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(email, password);
    }
}