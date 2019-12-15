export default function getType(object) {
  return {}.toString.call(object).slice(8, -1);
}
