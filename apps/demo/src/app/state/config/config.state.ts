import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ConfigInit } from './config.actions';
import { CONFIG, Config, Repository, Version } from './config.model';

@State<Config>({
  name: CONFIG,
  defaults: null,
})
@Injectable()
export class ConfigState {
  @Selector()
  static repository(state: Config): Repository {
    return state?.repository;
  }

  @Selector()
  static versions(state: Config): Version[] {
    return state?.versions;
  }

  @Action(ConfigInit)
  init(context: StateContext<Config>, action: ConfigInit): void {
    context.patchState(action.config);
  }
}
