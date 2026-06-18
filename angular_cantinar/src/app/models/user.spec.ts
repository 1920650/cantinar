import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(1, 'User 1', 'user1@example.com', 604354323 , 'admin')).toBeTruthy();
  });
});
