import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const count = 35;
  const defaults = {
    origin: { y: 1 },
    zIndex: 1000,
    spread: 55,
    startVelocity: 30,
    ticks: 65,
    scalar: 1,
    shapes: ['square', 'circle'],
    colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.35, {
    spread: 35,
    startVelocity: 25,
  });

  fire(0.3, {
    spread: 70,
  });

  fire(0.45, {
    spread: 120,
    decay: 0.91,
    scalar: 1.2
  });

  fire(0.15, {
    spread: 140,
    startVelocity: 35,
    decay: 0.92,
    scalar: 1.4
  });

  fire(0.15, {
    spread: 145,
    startVelocity: 55,
  });
}