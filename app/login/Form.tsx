'use client';

import { auth } from '@/actions/auth';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Toaster, toast } from 'sonner';
import SubmitButton from './compoents/SubmitButton';

const Form = () => {
  const [error, formAction] = useFormState(auth, { message: '' });

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form action={formAction}>
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

      <SubmitButton />

      <Toaster richColors />
    </form>
  );
};

export default Form;
