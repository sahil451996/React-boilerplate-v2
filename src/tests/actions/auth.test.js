import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
    const id = '123abc';
    const action = login(id);
    expect(action).toEqual({ type: 'LOGIN', uid: '123abc' });
});

test('should generate logout action object', () => {
    const action = logout();
    expect(action).toEqual({ type: 'LOGOUT' });
});