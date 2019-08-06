import { Detector as detector } from '../src/detect-link-type';

test('should be able to work with links with queries', () => {
  const link = 'http://example.com/index.html?q=something';
  expect(detector.isHTML(link)).toBeTruthy();
});

test('should be able to work with links with images', () => {
  const link = 'https://scontent.xx.fbcdn.net/v/t1.0-9/p720x720/a124.jpg?oh=somekycae52123123241&oe=12aFEAFV3';
  expect(detector.isImage(link)).toBeTruthy();
});

test('should detect the extension', () => {
  const link = 'http://example.com/index.html';
  expect(detector.getExtension(link)).toBeTruthy();
});

test('should detect type is html', () => {
  const link = 'http://example.com/index.html';
  expect(detector.isHTML(link)).toBe(true);
});

test('should detect type is jpg', () => {
  const link = 'http://example.com/image.jpeg';
  const link2 = 'http://example.com/image.jpg';
  expect(detector.isJPG(link)).toBe(true);
  expect(detector.isJPG(link2)).toBe(true);
});

test('should detect type is gif', () => {
  const link = 'http://example.com/image.gif';
  expect(detector.isGIF(link)).toBe(true);
});

test('should detect type is png', () => {
  const link = 'http://example.com/image.png';
  expect(detector.isPNG(link)).toBe(true);
});

test('should detect type is image', () => {
  const link = 'http://example.com/image.png';
  expect(detector.isImage(link)).toBe(true);
});

test('should detect type is css', () => {
  const link = 'http://example.com/style.css';
  expect(detector.isCSS(link)).toBe(true);
});

test('should detect type is ttf', () => {
  const link = 'http://example.com/style.ttf';
  expect(detector.isTTF(link)).toBe(true);
});

test('should detect type is js', () => {
  const link = 'http://example.com/style.js';
  expect(detector.isJS(link)).toBe(true);
});

test('should detect type is pdf', () => {
  const link = 'http://example.com/style.pdf';
  expect(detector.isPDF(link)).toBe(true);
});
