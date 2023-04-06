export interface Request<T extends unknown> {
  message: string;
  data: T;
  ok: boolean;
  status?: number;
}
