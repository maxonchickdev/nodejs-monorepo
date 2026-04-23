import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({
	description: "Auth RDO",
	name: "AuthRdo",
})
class AuthRdo {
	@ApiProperty({
		example: "",
		name: "accessToken",
		nullable: false,
		required: true,
		type: String,
	})
	accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}
}

export { AuthRdo };
