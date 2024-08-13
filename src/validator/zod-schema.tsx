import { z } from 'zod';
import { mobileRegExp } from '@/lib/function';

export const CareerFormSchema = z.object({
    name: z.string()
        .min(4, { message: "Name must be at least 4 characters long" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
    mobile: z.string()
        .trim()
        .regex(mobileRegExp, "Mobile number must contain only digits")
        // .refine(value => !/\s/.test(value), { message: "Mobile number cannot contain spaces" })
        // .refine(value => /^\d+$/.test(value), { message: "Mobile number must contain only digits" })
        .refine(value => value.length === 10, { message: "Mobile number must be exactly 10 digits" }),

    email: z.string()
        .trim()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),

    // terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
    terms: z.coerce.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
});

export type CareerType = z.infer<typeof CareerFormSchema>;
