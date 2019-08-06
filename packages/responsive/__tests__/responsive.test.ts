import { Responsive } from '../src/responsive';

// Setup polyfill
(global as any).window = {};

describe('isXs', () => {
  test('should detect extra small screens', () => {
    expect(Responsive.isXs(100)).toBe(true);
    expect(Responsive.isXs(200)).toBe(true);
    expect(Responsive.isXs(300)).toBe(true);
    expect(Responsive.isXs(500)).toBe(true);
  });

  test('should detect extra small screens with window inner width', () => {
    (window as any).innerWidth = 300;
    expect(Responsive.isXs()).toBe(true);
  });

  test('should detect large screens are not xs', () => {
    expect(Responsive.isXs(600)).toBe(false);
  });
});

describe('isSm', () => {
  test('should detect small screens', () => {
    expect(Responsive.isSm(100)).toBe(false);
    expect(Responsive.isSm(500)).toBe(false);
    expect(Responsive.isSm(768)).toBe(true);
    expect(Responsive.isSm(1000)).toBe(false);
  });

  test('should detect small screens with window inner width', () => {
    (window as any).innerWidth = 700;
    expect(Responsive.isSm()).toBe(true);
  });

  test('should detect large screens are not sm', () => {
    expect(Responsive.isSm(1200)).toBe(false);
  });
});

describe('isMd', () => {
  test('should detect medium screens', () => {
    expect(Responsive.isMd(800)).toBe(true);
    expect(Responsive.isMd(100)).toBe(false);
    expect(Responsive.isMd(500)).toBe(false);
    expect(Responsive.isMd(1000)).toBe(false);
  });

  test('should detect small screens with window inner width', () => {
    (window as any).innerWidth = 950;
    expect(Responsive.isMd()).toBe(true);
  });

  test('should detect large screens are not md', () => {
    expect(Responsive.isMd(1900)).toBe(false);
  });
});

describe('isLg', () => {
  test('should detect large screens', () => {
    expect(Responsive.isLg(100)).toBe(false);
    expect(Responsive.isLg(500)).toBe(false);
    expect(Responsive.isLg(800)).toBe(false);
    expect(Responsive.isLg(1000)).toBe(true);
    expect(Responsive.isLg(2568)).toBe(true);
  });

  test('should detect small screens with window inner width', () => {
    (window as any).innerWidth = 1920;
    expect(Responsive.isLg()).toBe(true);
  });
});

describe('#isMobile', () => {
  test('should detect mobile screens', () => {
    expect(Responsive.isMobile(700)).toBe(true);
    expect(Responsive.isMobile(1000)).toBe(false);
  });
});

describe('#isDesktop', () => {
  test('should detect desktop screens', () => {
    expect(Responsive.isDesktop(700)).toBe(false);
    expect(Responsive.isDesktop(1000)).toBe(true);
    expect(Responsive.isDesktop(1200)).toBe(true);
  });
});

describe('Setting new breakpoints', () => {
  test('should detect the new breakpoints ok', () => {
    Responsive.setBreakpoints({ xs: 100, sm: 200, md: 1200 });
    expect(Responsive.isXs(100)).toBe(true);
    expect(Responsive.isSm(150)).toBe(true);
    expect(Responsive.isSm(200)).toBe(true);
    expect(Responsive.isMd(1000)).toBe(true);
    expect(Responsive.isMd(1900)).toBe(false);
  });
});
