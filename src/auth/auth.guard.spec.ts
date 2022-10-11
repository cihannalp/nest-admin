import { Auth\authGuard } from './auth\auth.guard';

describe('Auth\authGuard', () => {
  it('should be defined', () => {
    expect(new Auth\authGuard()).toBeDefined();
  });
});
