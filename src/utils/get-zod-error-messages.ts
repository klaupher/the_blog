import { ZodError } from 'zod';

// export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
//   return Object.values(error)
//     .map(field => {
//       if (Array.isArray(field)) return field;
//       return field?._errors || [];
//     })
//     .flat()
//     .filter(Boolean);
// }

export function getZodErrorMessages(error: ZodError): string[] {
  return error.issues.map(issue => issue.message);
}
