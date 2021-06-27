import { ctl } from '../src';

test('should remove new lines and whitespaces', () => {
  const className = `bg-black text-small mt-2`;
  expect(ctl(className)).toBe('bg-black text-small mt-2');
});

test('should handle template literals', () => {
  const someTruthyState = true;
  const someFalsyState = false;
  const className = `
		bg-black text-small mt-2
		${someTruthyState && `mb-3`}
		${someFalsyState && `ml-3`}
	`;
  expect(ctl(className)).toBe('bg-black text-small mt-2 mb-3');
  expect(ctl(className)).not.toBe('bg-black text-small mt-2 mb-3 ml-3');
});

test('should extract variant group classes correctly', () => {
  const className = `bg-blue-600 text-white focus:(ring-1 ring-blue-900)`;

  expect(ctl(className)).toBe(
    'bg-blue-600 text-white focus:ring-1 focus:ring-blue-900'
  );
});

test('should extract stackable variants group classes correctly', () => {
  const className = `bg-blue-600 text-white hover:focus:(ring-1 ring-blue-900)`;
  expect(ctl(className)).toBe(
    'bg-blue-600 text-white hover:focus:ring-1 hover:focus:ring-blue-900'
  );
});
