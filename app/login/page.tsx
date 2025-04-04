import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" required type="email" />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" required type="password" />
      <button formAction={void login}>Log in</button>
      <button formAction={void signup}>Sign up</button>
    </form>
  );
}
