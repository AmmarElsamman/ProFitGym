export const GYM_TIME_ZONE = 'Africa/Cairo';

// Returns yyyy-MM-dd in the gym's time zone, the format <input type="date"> needs
export function toDateInput(value?: string | Date): string {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-CA', { timeZone: GYM_TIME_ZONE });
}