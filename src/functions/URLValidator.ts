export function urlValidator(str: string) {
  const validUrlRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi;

  return str.match(validUrlRegex);
}
