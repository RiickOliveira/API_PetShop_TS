import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../DTOs/account/authenticate.dto";
import { AccountService } from "../services/account.services";
import { Result } from "../models/result.model";
import { ResetPasswordDto } from "../DTOs/account/reset-password.dto";
import { Guid } from "guid-typescript"
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { ChangePasswordDto } from "../DTOs/account/change-password.dto";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private readonly authService: AuthService,
        private readonly accountService: AccountService
    ) { }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password)
        console.log(customer)
        //caso nao encontre o usuario
        if (!customer)
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        //caso o usuario esteja inativo 
        if (!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        //Gera o token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null)
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new Result('Uma nova senha foi enviada para o seu e-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        const user = request.user;
        //gera o token
        const token = await this.authService.createToken(user.document, user.email, user.image, user.roles);
        return new Result(null, true, token, null);
    }

}