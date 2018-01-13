import reducer from './auth';
import { createAuthRequestSuccessAction } from '../actions/auth';

describe('auth reducer', () => {
  it('should return initial state if action is invalid', () => {
    const a: any = { type: 'undefined' }
    expect(reducer(undefined, a)).toEqual({
      idToken: undefined,
      userId: undefined,
      error: undefined,
      loading: false,
      redirectPath: '/',
    });
  });

  it('should return a state which is set token and userId properly if AuthRequestSuccessAction is passed', function () {
    expect(reducer({
      idToken: undefined,
      userId: undefined,
      error: undefined,
      loading: false,
      redirectPath: '/',
    }, createAuthRequestSuccessAction({
      idToken: 'some-token',
      localId: 'some-user-id',
      email: 'some@email.com',
      kind: 'some-kind',
      refreshToken: 'some-refresh-token',
      expiresIn: '3600'
    }))).toEqual({
      idToken: 'some-token',
      userId: 'some-user-id',
      error: undefined,
      loading: false,
      redirectPath: '/',
    });
  });
});