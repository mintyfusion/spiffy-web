import DOMPurify from "isomorphic-dompurify";

import IWordsStyles from "typings/interfaces/IWordsStyles";

export default function styleWords(text: string, wordsStyles: IWordsStyles[]): string {
    let newText = text;
    if (wordsStyles) {
        wordsStyles.forEach((word: IWordsStyles) => {
            newText = newText.replace(
                word.text,
                `<span class="${word.className}">${word.text}</span>`
            );
        });
    }
    
    return DOMPurify.sanitize(newText);
}
