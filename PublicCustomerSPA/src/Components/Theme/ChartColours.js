export const ChartColours = [
  "#C63940", // Muted Red
  "#41A865", // Muted Green
  "#3E72BF", // Muted Blue
  "#BFBA38", // Muted Yellow
  "#9056BF", // Muted Purple
  "#56BFB5", // Muted Teal
  "#BF5690", // Muted Magenta
  "#56AEBF", // Muted Cyan
  "#BFAF3E", // Muted Olive
  "#BF8450", // Muted Brownish Orange
  "#E87474", // Muted Light Red
  "#74E89B", // Muted Light Green
  "#748EE8", // Muted Light Blue
  "#9E3A36", // Muted Dark Red
  "#36A87F", // Muted Dark Green
  "#36509E", // Muted Dark Blue
  "#E8DF74", // Muted Light Yellow
  "#59CFA2", // Muted Greenish Teal
  "#9D59CF", // Muted Violet
  "#9F9F9F", // Muted Gray
  "#E874D1", // Muted Light Magenta
  "#74D6E8", // Muted Light Cyan
];

export function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

export function darkenAndPale(color) {
  const [r, g, b] = hexToRgb(color);
  const factor = 0.9;
  const grayLevel = 128;
  const newR = Math.round(r * factor + grayLevel * (1 - factor));
  const newG = Math.round(g * factor + grayLevel * (1 - factor));
  const newB = Math.round(b * factor + grayLevel * (1 - factor));
  return rgbToHex(newR, newG, newB);
}
