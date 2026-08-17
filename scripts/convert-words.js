const fs = require("fs");

function convert(inputFile, outputFile, variableName) {
    const words = fs
    .readFileSync(inputFile, 'utf-8')
    .split(/\r?\n/)
    .map((word) => word.trim().toUpperCase())
    .filter(Boolean);

    const content = 
    variableName === 'validWords' ?
    `export const ${variableName} = new Set(${JSON.stringify(words)})` :
    `export const ${variableName} = ${JSON.stringify(words)}`;
    fs.writeFileSync(outputFile, content);
}

convert('src/data/answers.txt', 'src/data/answers.ts', 'answers');
convert('src/data/validWords.txt', 'src/data/validWords.ts', 'validWords');