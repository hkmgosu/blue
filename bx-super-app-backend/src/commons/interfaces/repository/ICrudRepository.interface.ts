export interface ICrudRepository<T> {
  get(): Promise<Array<T>>;
  getById(id: string): Promise<T>;
  create<R>(doc: R | T): Promise<T>;
  update<R>(id: string, doc: R | T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
