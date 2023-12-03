'use client';

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			aria-disabled={pending}
			aria-busy={pending}
			data-cy='submit'
		>
			{pending ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
		</button>
	);
};

export default SubmitButton;