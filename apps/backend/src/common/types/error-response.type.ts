type ErrorResponseBodyType = {
	statusCode: number;
	error: string;
	message: string | string[];
	path?: string;
	timestamp?: string;
};

type HttpExceptionResponseType =
	| string
	| { message?: string | string[]; error?: string; statusCode?: number };

export type { ErrorResponseBodyType, HttpExceptionResponseType };
