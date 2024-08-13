
import { ParsedUrlQueryInput } from 'node:querystring';
import { ComponentType } from 'react';

interface Href {
    pathname: string;
    query?: ParsedUrlQueryInput;
}

export interface linkProps {
    href: string | Href;
}

export interface IconProps {
    className?: string;
}

export interface ListId {
    id?: number | string
}

export interface MenuLinks extends ListId, linkProps {
    label: string,
    button?: boolean
    icon?: ComponentType<IconProps>;
}

export interface MenuLinksList {
    label: string,
    // links: MenuLinks[] | MenuLinks | object | string | React.ReactNode;
    links: MenuLinks[] | MenuLinks | object | string | React.ReactNode;
}

export interface ResultType {
    status: number;
    success: boolean;
    message: Record<string, unknown>;
}
