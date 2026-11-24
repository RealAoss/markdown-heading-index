function fail(message) {
    throw new Error(message);
}
export function transform(s) {
    if (!s.trim()) fail('Enter some source text.');
    let fence = null;
    const out = [];
    for (const line of s.split(/\r?\n/)) {
        const f = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (f) {
            if (!fence) fence = f[1];
            else if (f[1][0] === fence[0] && f[1].length >= fence.length && !f[2].trim()) fence = null;
            continue
        }
        if (fence) continue;
        const m = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
        if (m) out.push('  '.repeat(m[1].length - 1) + '- ' + m[2])
    }
    return out.join('\n') || 'No headings found.'
}
