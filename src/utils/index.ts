export function getUUid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring(1);
  }
  return S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
