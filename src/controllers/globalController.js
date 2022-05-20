export function paramsAreUndefined(...params) {
  let result = false;

  for (const param of params) {
    if (param === undefined) {
      result = true;
    }
  }

  return result;
}
