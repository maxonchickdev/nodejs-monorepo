import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyEnum } from "../../common/enums/config-key.enum";
import type { S3Type } from "../config/types/s3.type";

@Injectable()
export class S3Service {
	private readonly s3Client: S3Client;
	private readonly bucketName: string;

	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const s3Config = configService.getOrThrow<S3Type>(ConfigKeyEnum.S3);

		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: s3Config.awsAccessKeyId,
				secretAccessKey: s3Config.awsSecretAccessKey,
			},
			region: s3Config.awsRegion,
		});

		this.bucketName = s3Config.awsS3BucketName;
	}

	async uploadFile(file: Express.Multer.File): Promise<string> {
		const key = `${randomUUID()}${extname(file.originalname)}`;

		const command = new PutObjectCommand({
			Body: file.buffer,
			Bucket: this.bucketName,
			ContentType: file.mimetype,
			Key: key,
		});

		await this.s3Client.send(command);
		return key;
	}

	async getSignedUrl(key: string): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		return getSignedUrl(this.s3Client, command, {
			expiresIn: 3000,
		});
	}

	async deleteFile(key: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		await this.s3Client.send(command);
	}

	async generateUploadPresignedUrl(
		fileName: string,
		contentType: string,
	): Promise<{
		url: string;
		key: string;
	}> {
		const key = `${randomUUID()}${extname(fileName)}`;

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			ContentType: contentType,
			Key: key,
		});

		const url = await getSignedUrl(this.s3Client, command, {
			expiresIn: 300,
		});

		return {
			key,
			url,
		};
	}
}
