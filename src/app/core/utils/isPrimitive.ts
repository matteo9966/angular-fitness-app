export function isPrimitive(val: any) {
  return !(typeof val == 'object' || typeof val == 'function');
}
