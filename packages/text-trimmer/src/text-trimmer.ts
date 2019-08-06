export interface ITrimParams {
  numWords?: number;
  numChars?: number;
  textTail?: string;
}

export function trim(text: string, params: ITrimParams): string {
  let outText: string = text;
  let includeTrailingDots: boolean = false;

  if (params.numWords !== undefined) {
    const splitArray = text.split(' ');

    if (splitArray.length > params.numWords) {
      includeTrailingDots = true;
    }

    outText = splitArray.slice(0, params.numWords).join(' ');
  } else if (params.numChars !== undefined) {
    if (text.length > params.numChars) {
      includeTrailingDots = true;
    }

    outText = text.substr(0, params.numChars);
  }

  // include trailing dots
  if (includeTrailingDots) {
    outText = `${outText}${params.textTail || '...'}`;
  }

  return outText;
}
