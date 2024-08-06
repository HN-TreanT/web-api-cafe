import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidateInputPipe } from "./pipe/validate.pipe";
import * as path from "path";
import * as bodyParser from "body-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix("/api/v1");
  app.useStaticAssets(path.join(__dirname, "../public"));

  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: true }));

  const options = new DocumentBuilder()
    .setTitle('Nestjs API starter')
    .setDescription('Nestjs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);


  const port = configService.get<number>("PORT");
  await app.listen(port, async () => {
    console.log(`The server is running on ${port} port: http://localhost:${port}`);
  });
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
