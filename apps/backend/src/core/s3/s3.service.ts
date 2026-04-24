import { randomUUID } from "node:crypto";
import {
	DeleteObjectCommand,
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client,
} from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyConstant } from "../../common/constants/config-key.constant";
import type { S3Type } from "../config/types/s3.type";

@Injectable()
export class S3Service {
	private readonly s3Client: S3Client;
	private readonly bucketName: string;
	private readonly region: string;

	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const s3Config = configService.getOrThrow<S3Type>(ConfigKeyConstant.s3);

		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: s3Config.awsAccessKeyId,
				secretAccessKey: s3Config.awsSecretAccessKey,
			},
			region: s3Config.awsRegion,
		});

		this.bucketName = s3Config.awsS3BucketName;
		this.region = s3Config.awsRegion;
	}

	public async deleteFile(key: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		await this.s3Client.send(command);
	}

	public async uploadFile(
		file: Express.Multer.File,
	): Promise<{ key: string; url: string }> {
		const key = randomUUID();

		const input: PutObjectCommandInput = {
			Bucket: this.bucketName,
			Key: key,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: "public-read",
		};

		const command = new PutObjectCommand(input);

		await this.s3Client.send(command);

		return {
			url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`,
			key,
		};
	}
}
