export const EXAMS_TABLE: string =
	process.env.NEXT_PUBLIC_EXAMS_TABLE_PROD ||
	process.env.NEXT_PUBLIC_EXAMS_TABLE_DEV ||
	"";

export const SECRET_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY || "";
