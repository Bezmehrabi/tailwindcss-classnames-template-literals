export function ctl(template: string) {
  let trimmedClassnames = template.replace(/\s+/gm, ' ');
  let formattedClassnames = trimmedClassnames
    .split(' ')
    .filter(
      c =>
        c !== 'false' &&
        c !== 'true' &&
        c !== 'undefined' &&
        !c.includes('(') &&
        !c.includes(')')
    )
    .join(' ')
    .trim();

  const groupVariantsMatches = template.matchAll(
    /([a-z:]+):\(([^)]+)\)/g
  );

  for (const match of groupVariantsMatches) {
    const [ ,variant, classes] = match as [any, string, string];
    const classNames = classes
      .replace(/\s+/gm, ' ')
      .split(' ')
      .map(klass => `${variant}:${klass}`)
      .join(' ')
      .trim();
    formattedClassnames = `${formattedClassnames} ${classNames}`;
  }

  return formattedClassnames;
}

