import { MouseEventHandler, useState } from 'react';

import { EXAMS_TABLE } from '@/keys/keys';
import { supabase } from '@/lib/supabaseClient';
import styles from './style.module.css';

type DeleteExamDialogProps = {
	onError: () => void;
	id: string | number;
	onFinish: () => void;
	onCancelDialog: MouseEventHandler<HTMLButtonElement>;
};

const DeleteExamDialog = ({
	onError,
	id,
	onFinish,
	onCancelDialog,
}: DeleteExamDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const deleteExam = async () => {
		setIsLoading(true);

		const { error } = await supabase
			.from(EXAMS_TABLE)
			.delete()
			.eq('id', Number(id));

		if (error) {
			setIsLoading(false);
			onError();
			throw new Error(`DB error: ${error.message}`);
		}

		setIsLoading(false);
		onFinish();
	};

	return (
		<dialog open>
			<article>
				<h3>¿Estas seguro que deseas borrar este elemento?</h3>
				<p>Esta acción no se puede deshacer.</p>
				<footer className={styles.dialogFooter}>
					<button
						type='button'
						className='secondary'
						onClick={onCancelDialog}>
						Cancelar
					</button>
					<button
						type='button'
						onClick={deleteExam}
						aria-busy={isLoading}
						data-cy='confirmDeleteButton'>
						{isLoading ? 'Borrando...' : 'Borrar'}
					</button>
				</footer>
			</article>
		</dialog>
	);
};

export default DeleteExamDialog;
