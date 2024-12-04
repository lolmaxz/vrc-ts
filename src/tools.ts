/**
 * Replaces special characters with their visual representation characters.
 *
 * VRChat does not allow some special characters in many fields, such as the display name, group's name, group's description/post and more.
 * This function replaces those special characters with their visual representation characters so VRChat accepts them.
 * @param input The string to replace the special characters.
 * @returns The string with the special characters replaced.
 */
export function replaceSpecialCharactersVRC(input: string): string {
    const replacements: { [key: string]: string } = {
        '@': '＠',
        '#': '＃',
        '$': '＄',
        '%': '％',
        '&': '＆',
        '=': '＝',
        '+': '＋',
        '/': '⁄',
        '\\': '＼',
        ';': ';',
        ':': '˸',
        ',': '‚',
        '?': '？',
        '!': 'ǃ',
        '"': '＂',
        '<': '≺',
        '>': '≻',
        '.': '․',
        '^': '＾',
        '{': '｛',
        '}': '｝',
        '[': '［',
        ']': '］',
        '(': '（',
        ')': '）',
        '|': '｜',
        '*': '∗',
    };

    let result = '';
    for (const char of input) {
        result += replacements[char] || char;
    }

    const output = result;

    return output;
}
