import {
  SAVE_PROFILE,
  SAVE_PROFILE_FAILED
} from './types';

export const saveProfile = (profile) => ({
  type: SAVE_PROFILE,
  payload: profile
});

export const saveProfileFailed = (error) => ({
  type: SAVE_PROFILE_FAILED,
  payload: error
});