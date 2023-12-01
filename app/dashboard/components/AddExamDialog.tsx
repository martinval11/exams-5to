import { FormEvent, MouseEventHandler, useState } from 'react';

import { EXAMS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import styles from './style.module.css';

type AddExamDialogProps = {
	onError: () => void;
	onFinish: () => void;
	onCancelDialog: MouseEventHandler<HTMLButtonElement>;
}

const AddExamDialog = ({
	onError,
	onFinish,
	onCancelDialog,
}: AddExamDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const addExam = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading(true);

		const form = new FormData(event.currentTarget as HTMLFormElement);
		const entries = Array.from(form.entries());

		const exam = {
			title: entries[0][1],
			assignatures: entries[1][1],
			date: entries[2][1],
		};

		const { error } = await supabase
			.from(EXAMS_TABLE)
			.insert(exam)
			.select();

		if (error) {
			onError();
			setIsLoading(false);
			throw new Error(`DB error: ${error.message}`);
		}

		setIsLoading(false);

		onFinish();
	};

	return (
		<dialog open>
			<article>
				<header className={styles.dialogHeader}>
					<button
						type='button'
						aria-label='Close'
						className={`close ${styles.closeModalButton}`}
						onClick={onCancelDialog}
					/>
					<h3>Añadir examen</h3>
				</header>
				<form
					onSubmit={addExam}
					className={styles.form}>
					<label>
						<span>Título del Examen</span>
						<input
							type='text'
							placeholder='Título del Examen'
							name='examTitle'
							data-cy='examTitle'
							required
						/>
					</label>

					<label>
						<span>Temas</span>
						<input
							type='text'
							placeholder='Ej: Tema 1, Tema 2, Tema 3...'
							name='examAssignatures'
							data-cy='examAssignatures'
							required
						/>
					</label>

					<label>
						<span>Fecha del examen</span>
						<input
							type='date'
							name='examDate'
							data-cy='examDate'
							required
						/>
					</label>

					<button
						type='submit'
						aria-busy={isLoading}
						data-cy='submitExam'>
						{isLoading ? 'Publicando...' : 'Publicar'}
					</button>
				</form>
			</article>
		</dialog>
	);
};

export default AddExamDialog;
