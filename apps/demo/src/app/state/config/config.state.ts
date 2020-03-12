import { Action, State, StateContext } from '@ngxs/store';
import { ConfigInit } from './config.actions';
import { Config, CONFIG } from './config.model';

@State<Config>({
  name: CONFIG,
  defaults: null
})
export class ConfigState {
  @Action(ConfigInit)
  init(context: StateContext<Config>, action: ConfigInit): void {
    context.patchState(action.config);
  }
}
