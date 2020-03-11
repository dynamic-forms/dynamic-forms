import { Config } from './config.model';

export class ConfigInit {
  static readonly type: string = '[Config] INIT';
  constructor(public config: Config) {}
}
