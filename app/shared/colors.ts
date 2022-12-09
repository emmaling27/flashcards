// from https://www.schemecolor.com/american-pastels.php
export const COLORS = [
  '#D1F0A4',
  '#BAB8F3',
  '#F2C1F3',
  '#C6E8EE',
  '#FCF7E7',
  '#F7DDCD',
]

export function randomColor() {
  const index = Math.floor(Math.random() * COLORS.length)
  return COLORS[index]
}
