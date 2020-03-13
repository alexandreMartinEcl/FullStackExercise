const scale = 100000;

/**
 * Cette classe permet de bousculer du mode online à local facilement
 * Chaque requête réalisée dans les .repository passe par ici
 * Si agent.local, cela renvoie aux fonctions ci-dessous renvoyant un exemple donnée de réponse
 * Si agent.online, cela renvoie à superagent
 *  Ce middleware permet l'authentifiation à chaque requête
 */


/**
 * @param {Array} journeys data
 */
export function computePassCountCategories(journeys) {
  const passengerCounts = journeys.map((j) => j.passengerCount);
  const maxPC = Math.max.apply(null, passengerCounts);
  // const minPC = Math.min.apply(passengerCounts)

  let categories = [...Array(Math.floor(maxPC / scale) + 1).keys()];
  // .filter(n => n >= Math.floor(minPC / scale))
  categories = categories.map((n) => `From ${n * scale} to ${(n + 1) * scale}`);

  return categories;
}

/**
 * @param {Array} journeys data
 */
export function getCategory(journey) {
  return Math.floor(journey.passengerCount / scale);
}
