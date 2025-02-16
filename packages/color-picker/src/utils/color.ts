/**
 * Convert hex to rgb
 * @param r - Red component
 * @param g - Green component
 * @param b - Blue component
 */
export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
