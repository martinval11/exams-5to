import { decrypt } from '@/lib/decrypt';
import { supabase } from '@/lib/supabaseClient';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type user = {
	name: string;
	password: string;
};

export const auth = async (formData: FormData) => {
	'use server';
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
		cookies().set('token', randomUUID());
		redirect('/dashboard');
	} else {
		redirect('/login/error');
	}
};