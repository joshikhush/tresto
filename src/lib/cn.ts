type ClassValue = string | false | null | undefined;

/** Joins truthy class names together, dropping falsy ones. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
