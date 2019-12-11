export const hex = (value: number, length = 2, prefix = '$') => `${prefix}${value.toString(16).padStart(length, '0')}`;
