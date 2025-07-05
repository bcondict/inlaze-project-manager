import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

  // const server = app.getHttpServer();
  // const router = server._events.request.router;
  // const routes = router.stack
  //   .filter((layer) => layer.route)
  //   .map((layer) => ({
  //     method: Object.keys(layer.route.methods),
  //     path: layer.route.path,
  //   }));
  // console.log('routes', routes);

  app.enableCors({
    origin: configService.get('cors.origin') || true,
    credentials: true,
  });

  const port = configService.get('port') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${configService.get('nodeEnv')}`);
}
void bootstrap();
