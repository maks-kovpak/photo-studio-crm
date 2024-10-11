export const DTypeConfig = {
  text: (await import('./text.tsx')).default,
  number: (await import('./number.tsx')).default,
  price: (await import('./price.tsx')).default,
  date: (await import('./date.tsx')).default,
  client: (await import('./client.tsx')).default,
};
