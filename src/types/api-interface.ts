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
    email: string;
    phone: string;
    title: string;
    slug: string;
    company: string;
    workType?: string;
    experience: string;
    currentCTC: number;
    expectedCTC: number;
    joinImmediately: string;
    resume: string;
    bio: string;
    portfolio?: string;
};

type Address = {
    street: String;
    city: String;
    state: String;
    zip: String;
} | null;
