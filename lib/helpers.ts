export const extractFirstLetters = (input: string) => {
  const trimmedInput = input.trim();
  const words = trimmedInput.split(/\s+/);

  if (words.length === 0) {
      return '';
  }

  const firstLetter = words[0].charAt(0);
  const lastLetter = words.length > 1 ? words[words.length - 1].charAt(0) : '';

  return (firstLetter + lastLetter).toUpperCase();
};

export const getRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF);
  const hexColor = randomColor.toString(16).padStart(6, '0');

  return `#${hexColor}`;
}