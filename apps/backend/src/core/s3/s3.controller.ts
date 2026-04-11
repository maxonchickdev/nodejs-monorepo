import {
	Controller,
	Get,
	Inject,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "./s3.service";

@Controller()
export class S3Controller {
	constructor(@Inject(S3Service) private readonly s3Service: S3Service) {}

	@Post()
	@UseInterceptors(FileInterceptor("file"))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		const key = await this.s3Service.uploadFile(file);
		const url = await this.s3Service.getSignedUrl(key);

		return { key, url };
	}

	@Get("download")
	async downloadFile(@Query("key") key: string) {
		const url = await this.s3Service.getSignedUrl(key);
		return { url };
	}

	@Get("presign-upload")
	async getUploadUrl(
		@Query("fileName") fileName: string,
		@Query("contentType") contentType: string,
	) {
		const { url, key } = await this.s3Service.generateUploadPresignedUrl(
			fileName,
			contentType,
		);
		return { url, key };
	}
}
