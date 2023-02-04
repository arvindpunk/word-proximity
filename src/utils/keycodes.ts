export enum KeyCode {
    Enter = "ENTER",
    Delete = "DEL",
    Backspace = "BACKSPACE"
}

export const isValidKeyCode = (key: string): boolean => {
    return key === KeyCode.Enter ||
        key === KeyCode.Delete ||
        key === KeyCode.Backspace ||
        /^[A-Z]$/.test(key);
}