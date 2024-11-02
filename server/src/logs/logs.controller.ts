import { Controller, Get, ParseFilePipe, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogsService } from './logs.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('logs')

export class LogsController {

  constructor(private logsService: LogsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new ParseFilePipe())
  file: Express.Multer.File,
  ) {
    await this.logsService.upload(file.originalname, file.buffer);
  }

  @Post('pdf')
  async generatePDF(): Promise<void> {
    await this.logsService.generateUserActivityPDF();
  }

  @Get('downloadPDF')
  async downloadPDF(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const file = createReadStream(join(__dirname, '..', '..', 'users_activity_report.pdf'));
    res.set({
      'Content-Type': 'application/pdf'
    })
    return new StreamableFile(file);
  }
}
