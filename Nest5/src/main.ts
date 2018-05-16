import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const cookieParser = require('cookie-parser');
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    app.use(cookieParser());
}

bootstrap();
