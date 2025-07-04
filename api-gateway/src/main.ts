import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    origin: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
