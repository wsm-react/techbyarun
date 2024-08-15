import { z } from 'zod';
import { mobileRegExp } from '@/lib/function';

const MAX_RESUME_MB = 2
const MAX_RESUME_UPLOAD_SIZE = 1024 * 1024 * MAX_RESUME_MB;

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const ACCEPTED_RESUME_TYPES = ["application/pdf", "application/msword"];


export const CareerFormSchema = z.object({
    name: z.string()
        .min(4, { message: "Name must be at least 4 characters long" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
    phone: z.string()
        .trim()
        .regex(mobileRegExp, "Mobile number must contain only digits")
        // .refine(value => !/\s/.test(value), { message: "Mobile number cannot contain spaces" })
        // .refine(value => /^\d+$/.test(value), { message: "Mobile number must contain only digits" })
        .refine(value => value.length === 10, { message: "Mobile number must be exactly 10 digits" }),
    email: z.string()
        .trim()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),

    title: z.string(),
    slug: z.string().trim(),
    company: z.string(),
    experience: z.string(),
    // currentCTC: z.number({ message: "Enter current annual salary, Example if 5LPA mention 500000" }).nullable(),
    currentCTC: z.preprocess(
        (input) => {
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        },
        z.number({ message: "Enter current annual salary, Example if 5LPA mention 500000" }).min(0),
    ),
    expectedCTC: z.preprocess(
        (input) => {
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        },
        z.number({ message: "Enter expected annual salary, Example if 5LPA mention 500000" }).min(0),
    ),
    noticePeriod: z.string(),
    bio: z.string().optional(),
    // resume: z.string().url({ message: "Invalid url" }),
    // resume: z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
    // resume: z.instanceof(FileList),
    resumeUri: z.instanceof(File)
        .refine((file) => { return !file || file.size <= MAX_RESUME_UPLOAD_SIZE }, `File size must be less than ${MAX_RESUME_MB} MB`)
        .refine((file) => { return ACCEPTED_RESUME_TYPES.includes(file.type) }, 'File must be a "PDF" or "word Document"'),

    // .refine((file) => {
    //     if (file.size === 0 || file.name === undefined) return false;
    //     else return true;
    // }, "Please update or add new image.")
    // .refine(
    //     (file) => ACCEPTED_RESUME_TYPES.includes(file?.type),
    //     ".jpg, .jpeg, .png and .webp files are accepted."
    // )
    // .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),

    portfolio: z.string().url({ message: "Invalid url" }),
    // terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
    terms: z.coerce.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
});

export type CareerType = z.infer<typeof CareerFormSchema>;
