export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE_NAME || 'inlaze_project_manager',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  
  microservices: {
    userAuth: process.env.USER_AUTH_SERVICE_URL || 'http://localhost:3001',
    taskManager: process.env.TASK_MANAGER_SERVICE_URL || 'http://localhost:3002',
    taskNotifier: process.env.TASK_NOTIFIER_SERVICE_URL || 'http://localhost:3003',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
}); 