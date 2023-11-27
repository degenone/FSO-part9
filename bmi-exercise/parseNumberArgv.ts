const parseNumberArgv = (
    argv: string[],
    minArgs: number,
    maxArgs: number
): number[] => {
    if (argv.length < minArgs) throw new Error('Too few arguments passed.');
    if (argv.length > maxArgs) throw new Error('Too many arguments passed.');
    const numberArgs: number[] = [];
    for (let i = 2; i < argv.length; i++) {
        const element = Number(argv[i]);
        if (isNaN(element)) throw new Error('Must only pass number arguments.');
        numberArgs.push(element);
    }
    return numberArgs;
};

export default parseNumberArgv;
