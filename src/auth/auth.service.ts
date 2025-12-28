import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }


    async register(email: string, password: string, name: string) {
        const user = await this.usersService.create(email, password, name);
        return {
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }


    async login(email: string, password: string) {

        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Wrong email or password');
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong email or password');
        }


        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
        });

        return {
            accessToken: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}