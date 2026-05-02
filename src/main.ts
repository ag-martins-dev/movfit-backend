import helmet from '@fastify/helmet'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  app.enableVersioning({ type: VersioningType.URI })

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('Movfit API')
    .setDescription('Movfit API documentation')
    .setVersion('1.0')
    .addTag('movfit-api')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/docs',
    apiReference({
      theme: 'purple',
      content: document,
      withFastify: true,
    }),
  )

  await app.register(() => helmet)
  await app.listen(process.env.PORT ?? 4949)
}
bootstrap()
