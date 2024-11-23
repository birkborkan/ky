// Map Latin characters to Zaghawa Beria Unicode
const latinToZaghawa = {
  'a': '\uE000',
  'b': '\uE001',
  'c': '\uE002',
  'd': '\uE003',
  'e': '\uE004',
  'f': '\uE005',
  'g': '\uE006',
  'h': '\uE007',
  'i': '\uE008',
  'j': '\uE009',
  'k': '\uE00A',
  'l': '\uE00B',
  'm': '\uE00C',
  'n': '\uE00D',
  'o': '\uE00E',
  'p': '\uE00F',
  'r': '\uE010',
  's': '\uE011',
  't': '\uE012',
  'u': '\uE013',
  'v': '\uE014',
  'w': '\uE015',
  'x': '\uE016',
  'y': '\uE017',
  'z': '\uE018',
  ' ': ' '
}

export const convertToZaghawa = (text) => {
  const char = text.toLowerCase()
  return char + (latinToZaghawa[char] || char)
}

export const isZaghawaChar = (char) => {
  return Object.values(latinToZaghawa).includes(char)
}