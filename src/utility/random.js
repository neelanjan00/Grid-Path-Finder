/**
 * rand50 returns 0 or 1 with a 50 - 50 probability.
 * @returns {number}
 */
const rand50 = () => {
  return Math.floor(Math.random() * 10) & 1;
};

/**
 * rand75 returns 0 with 75% probability and 1 with 25% probability.
 * @returns {number}
 */
function rand75() {
  return rand50() & rand50(); // & truth table operation gives us '0' 3/4 times and '1' 1/4 times
}

export { rand75 };
