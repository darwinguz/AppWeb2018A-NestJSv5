import {Get, Controller, UseGuards, ReflectMetadata, Req, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {JwtGuard} from "./guards/jwt.guard";

@Controller()
@UseGuards(JwtGuard)
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    @ReflectMetadata("necesitaProteccion", false)
    root(@Req() req,@Res() res): string {
        res.set('x-frame-options','sameorigin');
        //return this.appService.root();
        return res.send('Hola q ase, probando x-frame-options=sameorigin')
    }

    @Get('hola')
    @ReflectMetadata("necesitaProteccion", true)
    hola(): string {
        return 'Hola amigos';
    }

}
