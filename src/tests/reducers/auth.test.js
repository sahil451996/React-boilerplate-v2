import authReducer from '../../reducers/auth';

test('should set the default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set the uid value to the state when logged in', () => {
    const action = { type: 'LOGIN', uid: '123abc' };
    const state = authReducer({},action);
    expect(state.uid).toBe(action.uid);
});

test('should set clear the uid value from state when logged out', () => {
    const action = { type: 'LOGOUT'};
    const state = authReducer({ uid: '123abc' }, action);
    expect(state).toEqual({});
});