export type ContectUsPayload = {
    firstName: string;
    lastName?: string;
    phone: string;
    email: string;
    subject?: string;
    message?: string;
    lookingFor?: string;
    budget?: string | null;
    dueDate?: Date | null;
    address?: Address
};

export type CareerPayload = {
    name: string;
    email: string;
    phone: string;
    title?: string;
    slug?: string;
    company?: string;
    experience: string;
    currentCTC: string;
    expectedCTC: string;
    noticePeriod?: string;
    resumeUri?: string;
    resumeType?: string;
    resumeName?: string;
    resumeSize?: string;
    bio?: string;
    portfolio?: string;
};

type Address = {
    street: String;
    city: String;
    state: String;
    zip: String;
} | null;
