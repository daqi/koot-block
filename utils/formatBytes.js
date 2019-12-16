export default function formatBytes(bytes, fixed = 2) {
  bytes = Number(bytes);
  if (Number.isNaN(bytes)) return ""; // Nan
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  for (i = 0; bytes >= 1024 && i < 5; i++) {
    bytes /= 1024;
  }
  const unit = units[i];
  return Number(bytes.toFixed(fixed)) + unit;
}
