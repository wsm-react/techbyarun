

export function EscapeRegExp(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}


export function PadWithZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}

export function GetAvatarName(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}

export const EscapeSpecialChars = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const mobileRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;


export function ParseUrlSearchParams(searchParams: URLSearchParams): Record<string, string> {
  const paramsObject: Record<string, string> = {};
  // Iterate over each key-value pair in the URLSearchParams
  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }
  return paramsObject;
}


// Utility function to filter out undefined values
export function filterUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}


export function filterUndefinedAndNull<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)) as Partial<T>;
}
