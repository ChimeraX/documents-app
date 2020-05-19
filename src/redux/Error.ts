export default interface Error<T> {
    cause: T;
    message?: string;
}
