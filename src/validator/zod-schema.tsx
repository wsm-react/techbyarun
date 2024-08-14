import { z } from 'zod';
import { mobileRegExp } from '@/lib/function';

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
    resume: z.string().url({ message: "Invalid url" }),
    portfolio: z.string().url({ message: "Invalid url" }),
    // terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
    terms: z.coerce.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
});

export type CareerType = z.infer<typeof CareerFormSchema>;
