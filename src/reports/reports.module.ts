import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './entities/report.entity'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    MulterModule.register({
      storage: diskStorage({
        destination: '/uploads/reports',
        filename: (_, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`)
        },
      }),
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule { }