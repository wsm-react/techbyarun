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


// ---------------------------------------------------------------------------
// Admin-managed site content schemas (services, case studies, blog, settings)
// ---------------------------------------------------------------------------

export const apiServiceCreateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/),
    title: vine.string().trim().minLength(1),
    tag: vine.string().trim().optional(),
    description: vine.string().optional(),
    badge: vine.string().optional(),
    heading: vine.string().optional(),
    headingAccent: vine.string().optional(),
    intro: vine.string().optional(),
    sections: vine.array(vine.object({
        type: vine.enum(['paragraphs', 'bullets', 'chips', 'steps']),
        title: vine.string().optional(),
        items: vine.array(vine.any()),
    })).optional(),
    ctaLabel: vine.string().optional(),
    sortOrder: vine.number().optional(),
    published: vine.boolean().optional(),
});

export const apiServiceUpdateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/).optional(),
    title: vine.string().trim().minLength(1).optional(),
    tag: vine.string().trim().optional(),
    description: vine.string().optional(),
    badge: vine.string().optional(),
    heading: vine.string().optional(),
    headingAccent: vine.string().optional(),
    intro: vine.string().optional(),
    sections: vine.array(vine.object({
        type: vine.enum(['paragraphs', 'bullets', 'chips', 'steps']),
        title: vine.string().optional(),
        items: vine.array(vine.any()),
    })).optional(),
    ctaLabel: vine.string().optional(),
    sortOrder: vine.number().optional(),
    published: vine.boolean().optional(),
});

export const apiCaseStudyCreateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/),
    title: vine.string().trim().minLength(1),
    headingAccent: vine.string().optional(),
    tag: vine.string().optional(),
    cardTags: vine.array(vine.string()).optional(),
    projectDescription: vine.string().optional(),
    cardDescription: vine.string().optional(),
    intro: vine.string().optional(),
    serviceTags: vine.array(vine.object({
        label: vine.string(),
        href: vine.string(),
    })).optional(),
    highlights: vine.array(vine.object({
        label: vine.string(),
        value: vine.string(),
    })).optional(),
    sections: vine.array(vine.object({
        heading: vine.string(),
        body: vine.string(),
    })).optional(),
    ctaLabel: vine.string().optional(),
    sortOrder: vine.number().optional(),
    published: vine.boolean().optional(),
});

export const apiCaseStudyUpdateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/).optional(),
    title: vine.string().trim().minLength(1).optional(),
    headingAccent: vine.string().optional(),
    tag: vine.string().optional(),
    cardTags: vine.array(vine.string()).optional(),
    projectDescription: vine.string().optional(),
    cardDescription: vine.string().optional(),
    intro: vine.string().optional(),
    serviceTags: vine.array(vine.object({
        label: vine.string(),
        href: vine.string(),
    })).optional(),
    highlights: vine.array(vine.object({
        label: vine.string(),
        value: vine.string(),
    })).optional(),
    sections: vine.array(vine.object({
        heading: vine.string(),
        body: vine.string(),
    })).optional(),
    ctaLabel: vine.string().optional(),
    sortOrder: vine.number().optional(),
    published: vine.boolean().optional(),
});

export const apiBlogCreateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/),
    title: vine.string().trim().minLength(1),
    subTitle: vine.string().optional(),
    tag: vine.string().optional(),
    body: vine.string().minLength(1),
    published: vine.boolean().optional(),
    createdAt: vine.date().optional(),
});

export const apiBlogUpdateSchema = vine.object({
    slug: vine.string().trim().regex(/^[a-z0-9-]+$/).optional(),
    title: vine.string().trim().minLength(1).optional(),
    subTitle: vine.string().optional(),
    tag: vine.string().optional(),
    body: vine.string().minLength(1).optional(),
    published: vine.boolean().optional(),
    createdAt: vine.date().optional(),
});

export const apiSiteSettingSchema = vine.object({
    value: vine.any(),
});
