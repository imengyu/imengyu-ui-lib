function remove<T>(array: T[], item: T) {
  let index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
    return true;
  }
  return false;
}
function removeAt<T>(array: T[], index: number) {
  if (index >= 0) {
    array.splice(index, 1);
    return true;
  }
  return false;
}
function insert<T>(array: T[], i: number, item: T) {
  if (i > array.length) {
    array.push(item);
    return array;
  }
  return array.splice(i, 0, item);
}
function contains<T>(array: T[], item: T) {
  return array.indexOf(item) >= 0;
}
function empty<T>(array: T[]) {
  return array.splice(0, array.length);
}
function addOnce<T>(array: T[], item: T) {
  if (array.indexOf(item) >= 0) return array.length;
  else return array.push(item);
}

export default {
  addOnce,
  empty,
  contains,
  insert,
  removeAt,
  remove,
};
