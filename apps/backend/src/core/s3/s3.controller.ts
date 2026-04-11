import {
	Controller,
	FileTypeValidator,
	Inject,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { S3Service } from "./s3.service";

@UseGuards(JwtGuard)
@ApiTags("Upload files")
@Controller("s3")
export class S3Controller {
	constructor(@Inject(S3Service) private readonly s3Service: S3Service) {}

	@Post("upload-single-file")
	@UseInterceptors(FileInterceptor("file"))
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				file: {
					type: "string",
					format: "binary",
				},
			},
		},
	})
	public uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 5 * 1024 * 1024,
						message: "File is too large. Max file size is 5MB",
					}),
					new FileTypeValidator({
						fileType: ".(png|jpeg|jpg)",
						errorMessage: "File with this extention not allowed",
					}),
				],
				fileIsRequired: true,
			}),
		)
		file: Express.Multer.File,
	) {
		return this.s3Service.uploadSingleFile(file);
	}
}
