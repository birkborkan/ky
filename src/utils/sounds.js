const keyPress = new Audio('/sounds/key-press.mp3');
const keyBackspace = new Audio('/sounds/key-backspace.mp3');
const keySpace = new Audio('/sounds/key-space.mp3');

export const playKeySound = (type = 'press') => {
  const sound = {
    press: keyPress,
    backspace: keyBackspace,
    space: keySpace
  }[type];

  if (sound) {
    sound.currentTime = 0;
    sound.volume = 0.4;
    sound.play().catch(() => {});
  }
}