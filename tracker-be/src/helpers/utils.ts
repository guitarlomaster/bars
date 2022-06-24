export function checkObjectKeys(obj: object, objKeys: string[]): boolean {
  return Object.keys(obj).some(key => !objKeys.includes(key));
}

export function filterObjectKeys(obj: object, objKeys: string[]): string[] {
  return Object.keys(obj).filter(key => !objKeys.includes(key));
}
