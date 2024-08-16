import { dominName } from '@/helpers/constants';


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

// export function sanitizeFileName(file: File): string {
//   if (!(file instanceof File)) {
//     throw new Error('Input must be a File object.');
//   }
//   let fileName = file.name;
//   // Replace spaces and special characters with underscores
//   fileName = fileName.replace(/[^a-zA-Z0-9.]/g, '-');
//   return fileName;
// }

// export function sanitizeFileName(file: File, prefix: string = '', suffix: string = ''): string {
export function sanitizeFileName(file: File, { prefix = '', suffix = '' }: { prefix?: string, suffix?: string } = {}): string {
  // const dominName = process.env.SITE_DOMIN ? process.env.SITE_DOMIN : process.env.SITE_DOMIN;

  if (!(file instanceof File)) {
    throw new Error('Input must be a File object.');
  }
  let fileName = file.name;
  // Remove spaces and replace special characters with hyphens
  fileName = fileName.replace(/[^a-zA-Z0-9.]/g, '-');
  // Get current date and time
  const now = new Date();
  const dateString = now.toISOString().replace(/[:T.-]/g, '-'); // Example format: 2024-08-15-10-23-23
  // Split the file name into name and extension
  const [name, extension] = fileName.split('.');
  // Construct the new file name
  const newFileName = `${dominName}-${prefix}-${suffix}-${dateString}.${extension || ''}`;
  return newFileName.toLowerCase();
}
