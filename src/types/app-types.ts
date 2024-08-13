import { ParsedUrlQueryInput } from 'node:querystring';
import { ComponentType } from 'react';

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

interface Href {
    pathname: string;
    query?: ParsedUrlQueryInput;
}
