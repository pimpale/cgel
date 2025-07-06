import english from './english.json';

function expandContractions(word: string): string[] {
    if (word.slice(-2) === "'s") {
        return [word.slice(0, -2), "s"];
    } else if (word.slice(-3) === "'re") {
        return [word.slice(0, -3), "are"];
    } else if (word === "I'm") {
        return ["I", "are"];
    } else if (word.slice(-3) === "'ll") {
        return [word.slice(0, -3), "will"];
    } else {
        return [word];
    }
}

function seperatePunctuation(word: string): string[] {
    if (word.length === 0) {
        return [];
    }
    
    const lastChar = word[word.length - 1];
    const punctuationRegex = /[.,!?;:'"()[\]{}]/;
    
    if (punctuationRegex.test(lastChar)) {
        // Split the word and the punctuation
        return [word.slice(0, -1), lastChar];
    } else {
        return [word];
    }
}


function normalizeBe(word: string): string {
    if (word === "am") {
        return "are";
    } else if (word === "was") {
        return "were";
    } else {
        return word;
    }
}

export function lex(input: string): string[] {
    // split on whitespace
    const words = input.split(/\s+/);
    return words
        .filter(x => x.trim() != "")
        .flatMap(seperatePunctuation)
        .flatMap(expandContractions)
        .map(normalizeBe)
        .map(word => word.toLowerCase());
}