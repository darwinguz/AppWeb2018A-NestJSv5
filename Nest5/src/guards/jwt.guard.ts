import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs/index";
import {JwtService} from "../servicios/jwt.service";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private _jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext)
        : boolean |
        Promise<boolean> |
        Observable<boolean> {

        const necesitaProteccion = this.reflector.get(
            "necesitaProteccion",
            context.getHandler());

        console.log('necesitaProteccion', necesitaProteccion);

        if (necesitaProteccion) {

            const request = context
                .switchToHttp()
                .getRequest();

            const jwt = request.headers.auth;
            console.log('jwt', jwt);
            if (jwt) {
                return this._jwtService
                    .verificarTokenSync(
                        jwt
                    );

            } else {
                return false;
            }

        } else {
            return true
        }

    }

}