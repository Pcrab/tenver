const numbers = "0123456789";
const letters = "abcdefghijklmnopqrstuvwxyz";
const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const randomChars =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function shuffle(str: string) {
  const chars = str.split("");
  for (let index = chars.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [chars[index], chars[randomIndex]] = [chars[randomIndex], chars[index]];
  }
  return chars.join("");
}

export function genRandomPwd(length: number) {
  let result = "";
  const number = numbers[Math.floor(Math.random() * numbers.length)].toString();
  const letter = letters[Math.floor(Math.random() * letters.length)].toString();
  const capitalLetter =
    capitalLetters[
      Math.floor(Math.random() * capitalLetters.length)
    ].toString();
  const specialChar =
    special[Math.floor(Math.random() * special.length)].toString();
  result = number + letter + capitalLetter + specialChar;
  for (let i = 0; i < length - 4; i++) {
    result += randomChars[Math.floor(Math.random() * randomChars.length)];
  }
  return shuffle(result);
}
