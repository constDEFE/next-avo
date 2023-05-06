import { ZodError, z } from "zod";

export const validateEmail = (email: string) => {
	const validator = z.string().email();

	try {
		validator.parse(email);
	} catch (error) {
		if (error instanceof ZodError) return false;
	}

	return true;
};
