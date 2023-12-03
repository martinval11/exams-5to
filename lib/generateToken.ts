'use server';

import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const generateToken = () => {
	return cookies().set('token', randomUUID());
};