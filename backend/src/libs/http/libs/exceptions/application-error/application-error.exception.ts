type Constructor = {
	cause?: unknown;
	message: string;
};

class ApplicationError extends Error {
	public constructor({message }: Constructor) {
		super(message);
	}
}

export { ApplicationError };
