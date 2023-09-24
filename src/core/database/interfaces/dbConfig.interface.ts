export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  query?: object;
  define?: object;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
