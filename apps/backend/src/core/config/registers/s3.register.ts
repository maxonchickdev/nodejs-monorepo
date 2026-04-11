import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { S3Type } from "../types/s3.type";

export const s3Register = registerAs(ConfigKeyEnum.S3, (): S3Type => {
	const awsRegion = process.env.AWS_REGION;
	const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
	const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
	const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME;

	if (
		!awsRegion ||
		!awsAccessKeyId ||
		!awsSecretAccessKey ||
		!awsS3BucketName
	) {
		throw new Error("Missing some envs");
	}

	return {
		awsRegion,
		awsAccessKeyId,
		awsSecretAccessKey,
		awsS3BucketName,
	};
});
