declare module 'use-react-screenshot' {
    type HookReturn = [
        string | null,
        (node: HTMLElement | null, options?: any) => Promise<string>
    ];
    export function useScreenshot(
        options?: { type?: string; quality?: number }
    ): HookReturn;
}
