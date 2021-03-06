// @flow

import {
  ADD_CHECK_RESULT,
  SET_VERSION,
  SUBMIT_VERSION,
  UPDATE_LATEST_CHANNEL_VERSIONS,
  UPDATE_POLLBOT_VERSION,
  UPDATE_VERSION_INPUT,
  UPDATE_RELEASE_INFO,
} from './types';
import type {Action, State} from './types';

export const initialState: State = {
  version: '',
  versionInput: '',
  latestChannelVersions: [],
  releaseInfo: null,
  checkResults: {},
  pollbotVersion: null,
  shouldRefresh: false,
};

export function deliveryDashboard(
  state: State = initialState,
  action: Action,
): State {
  switch (action.type) {
    case ADD_CHECK_RESULT:
      return Object.assign({}, state, {
        checkResults: Object.assign({}, state.checkResults, {
          [action.title]: action.result,
        }),
        shouldRefresh:
          action.result.status !== 'exists' ? true : state.shouldRefresh,
      });
    case SET_VERSION:
      return Object.assign({}, state, {
        version: action.version,
        versionInput: action.version,
        checkResults: {},
        shouldRefresh: false,
      });
    case UPDATE_VERSION_INPUT:
      return Object.assign({}, state, {
        versionInput: action.version,
      });
    case SUBMIT_VERSION:
      return Object.assign({}, state, {
        version: state.versionInput,
      });
    case UPDATE_LATEST_CHANNEL_VERSIONS:
      return Object.assign({}, state, {
        latestChannelVersions: action.versions,
      });
    case UPDATE_RELEASE_INFO:
      return Object.assign({}, state, {
        releaseInfo: action.releaseInfo,
      });
    case UPDATE_POLLBOT_VERSION:
      return Object.assign({}, state, {
        pollbotVersion: action.version,
      });
    default:
      return state;
  }
}
