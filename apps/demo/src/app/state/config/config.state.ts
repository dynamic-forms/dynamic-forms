import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ConfigInit } from './config.actions';
import { Config, CONFIG, Repository, Version } from './config.model';

@State<Config>({
  name: CONFIG,
  defaults: null
})
export class ConfigState {
  @Selector()
  static repository(state: Config): Repository {
    return state ? state.repository : undefined;
  }

  @Selector()
  static versions(state: Config): Version[] {
    return state ? state.versions : undefined;
  }

  @Action(ConfigInit)
  init(context: StateContext<Config>, action: ConfigInit): void {
    context.patchState(action.config);
  }
}
