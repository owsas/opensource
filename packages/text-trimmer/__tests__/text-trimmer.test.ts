/* tslint:disable max-line-length */
import { trim } from '../src/text-trimmer';

describe('Without any trimming params', () => {
  test('should return the same input string', () => {
    const text = 'Cali es una ciudad de Colombia en la cual habitan más de dos millones de personas. Cali is a colombian city populated by more than two million people';
    const result = trim(text, {});
    expect(result).toEqual(text);
  });
});

describe('Trimming with numWords', () => {
  test('should trim correctly', () => {
    const text = 'Colombia es una tierra mágica, con paraísos naturales inolvidables. Colombia is a magical land with unforgettable natural paradises';

    const expected = 'Colombia es una tierra mágica, con...';
    const result = trim(text, { numWords: 6 });
    expect(result).toEqual(expected);
  });

  test('should not add trailing dots if the string\'s length is lower than the number of words specified', () => {
    const text = 'Bienvenido a nuestro país';
    const expected = 'Bienvenido a nuestro país';

    const result = trim(text, { numWords: 10 });
    expect(result).toEqual(expected);
  });
});

describe('Trimming with numChars', () => {
  test('should trim correctly', () => {
    const text = 'Colombia es una tierra mágica, con paraísos naturales inolvidables. Colombia is a magical land with unforgettable natural paradises';

    const expected = 'Colombia es una tierra mágica...';
    const result = trim(text, { numChars: 29 });
    expect(result).toEqual(expected);
  });

  test('should not add trailing dots if the string\'s length is lower than the number of characters specified', () => {
    const text = 'Bienvenido a nuestro país';
    const expected = 'Bienvenido a nuestro país';

    const result = trim(text, { numChars: 29 });
    expect(result).toEqual(expected);
  });
});

describe('Trimming with custom textTail', () => {
  test('should add the textTail correctly', () => {
    const text = 'This is just a very long long long long text';
    const expected = 'This is just a very long long long:::';

    const result = trim(text, { numWords: 8, textTail: ':::' });
    expect(result).toEqual(expected);
  });
});
