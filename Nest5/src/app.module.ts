import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {ParametrosController} from "./parametros.controller";

@Module({
  imports: [],
  controllers: [
      AppController,
      UsuarioController,
      ParametrosController
  ],
  providers: [
      AppService,
      UsuarioService
  ],
})
export class AppModule {}
