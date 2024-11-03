import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './log.schema';

const PDFDocument = require('pdfkit');
const fs = require('fs');


@Injectable()
export class LogsService {

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION')
  })
  private readonly logger = new Logger(LogsService.name);

  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>,
    private readonly configService: ConfigService,
  ) { }

  async upload(fileName: string, file: Buffer) {
    const bucketName = this.configService.getOrThrow('S3_BUCKET_NAME'); 
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      }),
    );
  }

  async logActivity(userId: string, action: string): Promise<Log> {
    const logEntry = new this.logModel({ userId, action });
    return logEntry.save();
  }

  async getUserActivityCount(userId: string, fromDate: Date): Promise<number> {
    const count = await this.logModel.countDocuments({
      userId,
      action: { $ne: 'login' },
      timestamp: { $gte: fromDate },
    });
    return count;
  }

  async getUsersActivityForPastDay(): Promise<Map<string, number>> {
    const fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - 1 / 24);

    const logs = await this.logModel.aggregate([
      {
        $match: {
          timestamp: { $gte: fromDate },
        },
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
        },
      },
    ]);

    const userActivityMap = new Map<string, number>();
    logs.forEach((log: any) => {
      userActivityMap.set(log._id, log.count);
    });

    return userActivityMap;
  }

  async generateUserActivityPDF(): Promise<void> {
    const userActivityMap = await this.getUsersActivityForPastDay();

    const doc = new PDFDocument();

    const writeStream = fs.createWriteStream('users_activity_report.pdf');
    doc.pipe(writeStream);
    doc.fontSize(16).text('User Activity Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    userActivityMap.forEach((activityCount, userId) => {
      doc.text(`User ID: ${userId}, Activity Count: ${activityCount}`);
      doc.moveDown();
    });

    doc.end();

    writeStream.on('finish', () => {
      this.logger.log(`PDF file created successfully!`);
    });
  }
}
