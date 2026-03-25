export const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    width: random(2, 6),
    height: random(2, 6),
    left: random(0, 100),
    top: random(0, 100),
    delay: random(0, 5),
  }));
};