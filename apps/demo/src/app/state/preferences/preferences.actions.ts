import { Preferences } from './preferences.model';

export class SetPreferences {
  static readonly type = '[Preferences] Set';
  constructor(public preferences: Preferences) {}
}
