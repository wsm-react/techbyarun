import vine from '@vinejs/vine';
import { mobileRegExp } from '@/lib/function';

export const apiForgotPasswordSchema = vine.object({
    email: vine.string().email(),
    terms: vine.literal(true)
})

export const apiSignUpSchema = vine.object({
    name: vine.string().minLength(2),
    email: vine.string().email(),
    mobile: vine.number().min(10).withoutDecimals(),
    password: vine.string().minLength(2),
    terms: vine.literal(true)
})

export const apiLeadCaptureSchema = vine.object({
    name: vine.string().minLength(4),
    email: vine.string().email(),
    mobile: vine.string().minLength(10).regex(mobileRegExp),
    terms: vine.literal(true)
})

export const ApiContectUsSchema = vine.object({
    firstName: vine.string().minLength(4),
    lastName: vine.string().optional(),
    phone: vine.string().minLength(10).regex(mobileRegExp),
    email: vine.string().email(),
    subject: vine.string().minLength(4),
    message: vine.string().minLength(4),
    lookingFor: vine.string(),
    budget: vine.string().optional(),
    dueDate: vine.date().optional(),
    address: vine.object({
        street: vine.string().optional(),
        city: vine.string().optional(),
        state: vine.string().optional(),
        zip: vine.string().optional(),
    }).optional(),
});


// export const ApiCareerSchema = vine.object({
//     firstName: vine.string().minLength(4),
//     lastName: vine.string().optional(),
//     phone: vine.string().minLength(10).regex(mobileRegExp),
//     email: vine.string().email(),
//     subject: vine.string().minLength(4),
//     message: vine.string().minLength(4),
//     lookingFor: vine.string(),
//     budget: vine.string().optional(),
//     dueDate: vine.date().optional(),
// });

export const ApiCareerSchema = vine.object({
    email: vine.string().trim().email(),
    phone: vine.string().trim().mobile().minLength(10).regex(mobileRegExp),
    title: vine.string(),
    slug: vine.string().trim(),
    company: vine.string(),
    experience: vine.string().trim(),
    currentCTC: vine.number().positive().withoutDecimals().min(1),
    expectedCTC: vine.number().positive().withoutDecimals().min(1),
    noticePeriod: vine.string(),
    bio: vine.string().optional(),
    // resume: vine.string(),
    portfolio: vine.string().activeUrl(),
});


export const ApiCareerResumeSchema = vine.object({
    email: vine.string().trim().email(),
    title: vine.string().trim(),
    type: vine.string().trim(),
    size: vine.string().trim(),
    link: vine.string().trim(),
});
