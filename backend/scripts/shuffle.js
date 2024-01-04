function shuffle(array) {
  const newArray = [...array];

  for (let start = 0; start < newArray.length; start++) {
    const randomPosition = Math.floor(
      (newArray.length - start) * Math.random()
    );
    const randomItem = newArray.splice(randomPosition, 1);
    newArray.push(...randomItem);
  }

  return newArray;
}

module.exports = shuffle;
