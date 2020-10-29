export let M: any;
export const setDesignWidth: (designWidth: number) => void;
export const fpx: (px: number) => number;
export const px: (px: number) => number;
export const $toast: (message: string) => void;
export const $confirm: (message: string, title?: string, options?: any) => Promise<any>;
export const $alert: (message: string, title?: string, buttonText?: string) => Promise<any>;