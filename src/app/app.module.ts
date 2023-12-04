import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from 'src/auth/auth.middleware'
import { AuthModule } from 'src/auth/auth.module'
import { MapModule } from 'src/map/map.module'
import { ReportsModule } from 'src/reports/reports.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST', 'db'),
        port: configService.get('DATABASE_PORT', 3306),
        username: configService.get('DATABASE_USERNAME', 'root'),
        password: configService.get('DATABASE_PASSWORD', 'root'),
        database: configService.get('DATABASE_SCHEMA', 'srt'),
        synchronize: configService.get('DATABASE_SYNC', true),
        autoLoadEntities: true
      })
    }),
    UsersModule,
    ReportsModule,
    AuthModule,
    MapModule
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*')
  }
}