import { randomUUID } from "node:crypto";
import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

	public async deleteFile(key: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		await this.s3Client.send(command);
	}

	public async uploadSingleFile(
		file: Express.Multer.File,
	): Promise<{ key: string; url: string }> {
		const key = randomUUID();

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: key,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: "public-read",
			Metadata: {
				originalName: file.originalname,
			},
		});

		await this.s3Client.send(command);

		const url = await this.getFileUrl(key);

		return {
			key,
			url,
		};
	}

	private getFileUrl(key: string): string {
		// TODO: check if this URL works in response
		const url = `https://${this.bucketName}.s3.amazonaws.com/${key}`;

		return url;
	}

	// private async getPresignedSignedUrl(key: string): Promise<string> {
	// 	const command = new GetObjectCommand({
	// 		Bucket: this.bucketName,
	// 		Key: key,
	// 	});

	// 	return getSignedUrl(this.s3Client, command, {
	// 		expiresIn: 60,
	// 	});
	// }
}
