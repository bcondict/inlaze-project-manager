import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigExampleService {
  constructor(private readonly configService: ConfigService) {}

  // Ejemplo de cómo acceder a la configuración
  getAppConfig() {
    return {
      port: this.configService.get<number>('port'),
      nodeEnv: this.configService.get<string>('nodeEnv'),
    };
  }

  // Ejemplo de configuración de base de datos
  getDatabaseConfig() {
    return this.configService.get('database');
  }

  // Ejemplo de configuración de microservicios
  getMicroservicesConfig() {
    return {
      userAuth: this.configService.get<string>('microservices.userAuth'),
      taskManager: this.configService.get<string>('microservices.taskManager'),
      taskNotifier: this.configService.get<string>('microservices.taskNotifier'),
    };
  }

  // Ejemplo de configuración JWT
  getJwtConfig() {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    };
  }

  // Ejemplo de configuración CORS
  getCorsConfig() {
    return {
      origin: this.configService.get<string>('cors.origin'),
    };
  }

  // Ejemplo de configuración de logging
  getLoggingConfig() {
    return {
      level: this.configService.get<string>('logging.level'),
    };
  }

  // Ejemplo de validación de configuración requerida
  validateRequiredConfig() {
    const requiredConfigs = [
      'microservices.userAuth',
      'microservices.taskManager',
      'microservices.taskNotifier',
      'jwt.secret',
    ];

    const missingConfigs = requiredConfigs.filter(
      (config) => !this.configService.get(config),
    );

    if (missingConfigs.length > 0) {
      throw new Error(
        `Missing required configuration: ${missingConfigs.join(', ')}`,
      );
    }

    return true;
  }
} 