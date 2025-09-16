export function areObjectsEqual(
  obj1: Record<string, string | boolean | number | undefined>,
  obj2: Record<string, string | boolean | number | undefined>
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isFalsyOrEmpty(value1) && isFalsyOrEmpty(value2)) {
      continue; // Both are considered "empty", so they're equal
    }

    if (value1 !== value2) {
      return false;
    }
  }

  return true;
}

function isFalsyOrEmpty(value: string | boolean | number | undefined): boolean {
  return value === undefined || value === null || value === '';
}
