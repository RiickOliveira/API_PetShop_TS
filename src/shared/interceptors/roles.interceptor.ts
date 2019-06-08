import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Result } from "src/modules/backoffice/models/result.model";

@Injectable()
export class RolesInterceptor implements NestInterceptor {
    constructor(public roles: string[]) { }

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const user: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(user);
        
        let hasHole = false;
        user.roles.forEach((role) => {
            if (this.roles.indexOf(role) != -1) {
                hasHole = true;
            }
        });

        if (!hasHole) {
            throw new HttpException(
                new Result('Acesso não autorizado', false, null, null),
                HttpStatus.FORBIDDEN
            )
        }

        return call$;
    }
}