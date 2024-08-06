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

type Address = {
    street: String;
    city: String;
    state: String;
    zip: String;
} | null;
