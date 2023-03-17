interface ErrorResponse {
    errors: {
        message: string,
        field?: string
    }[]
}

export default ErrorResponse;