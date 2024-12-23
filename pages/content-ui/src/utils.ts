/**
 * Creates a function that repeatedly calls the provided callback at random intervals within the specified range.
 *
 * @param callback - The function to be called at each interval.
 * @param range - A tuple specifying the minimum and maximum delay (in milliseconds) between each callback execution.
 *
 * @returns A function that, when called, stops the repeated execution of the callback.
 *
 * @throws Will throw an error if the range is not between [500, 20000] or if min is not less than max.
 */
export function createRandomInterval(callback: () => void, range: [number, number]): () => void {
  let [min, max] = range;

  if (min < 1001) {
    min = 1000;
  }

  if (min < 500 || max > 20000 || min >= max) {
    throw new Error('Range must be between [500, 10000] and min < max.');
  }

  let intervalId: number | null = null;
  let stopped = false;

  const runCallback = () => {
    if (stopped) return;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    callback();
    intervalId = setTimeout(runCallback, delay);
  };

  // Start the first iteration
  setTimeout(runCallback, min);

  // Return the stop function
  return () => {
    console.log('stopped');

    stopped = true;
    if (intervalId !== null) {
      clearTimeout(intervalId);
    }
  };
}
