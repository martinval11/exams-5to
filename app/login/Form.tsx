import { auth } from '@/actions/auth';

const Form = () => {
  return (
    <form action={auth}>
      <label>
        <span>Nombre de Usuario</span>
        <input
          type='text'
          placeholder='Tu nombre de usuario'
          name='username'
          data-cy='username'
          required
        />
      </label>

      <label>
        <span>Contraseña</span>
        <input
          type='password'
          placeholder='Tu contraseña'
          name='password'
          data-cy='password'
          required
        />
      </label>

      <button type='submit' data-cy='submit'>Iniciar Sesión</button>
    </form>
  );
};

export default Form;
