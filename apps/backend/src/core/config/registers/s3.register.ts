import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { S3Type } from "../types/types";

const S3Register = registerAs(ConfigKeyConstant.s3, (): S3Type => {
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

export { S3Register };
