'use server';
import { decrypt } from '@/lib/decrypt';
import { generateToken } from '@/lib/generateToken';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

type user = {
	name: string;
	password: string;
};

export const auth = async (prevState: any, formData: FormData) => {
	const username = formData.get('username');
	const password = formData.get('password');

	const { data: users, error } = await supabase
		.from('users')
		.select('name, password');

	if (error) {
		console.error(`Server Error ${error}`);
		redirect('/login/error');
	}

	const searchUser = users.find(
		(user: user) =>
			user.name === username && decrypt(user.password).message === password
	);

	if (searchUser) {
		generateToken();
		redirect('/dashboard');
	} else {
		return { message: 'Error' };
		//redirect('/login/error');
	}
};