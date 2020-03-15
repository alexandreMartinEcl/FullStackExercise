import agent from 'superagent';

/**
 * Cette classe permet de bousculer du mode online à local facilement
 * Chaque requête réalisée dans les .repository passe par ici
 * Si agent.local, cela renvoie aux fonctions ci-dessous renvoyant un exemple donnée de réponse
 * Si agent.online, cela renvoie à superagent
 *  Ce middleware permet l'authentifiation à chaque requête
 */


// Swap base if you want to access online backend with local frontend
// const base = 'http://127.0.0.1:8000';
const base = process.env.BACKEND_BASE_URL;

function localCreateJourney(journeyData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        body: {
          success: true,
          result: {
            journeyData,
          },
        },
      });
    }, 1000);
  });
}

function localGetJourneys() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        body: {
          success: true,
          result: {
            journeys: [
              {
                ReportPeriod: '2006-01-01T00:00:00',
                Terminal: 'Imperial Terminal',
                Arrival_Departure: 'Arrival',
                Domestic_International: 'Domestic',
                Passenger_Count: 490,
              },
              {
                ReportPeriod: '2006-01-01T00:00:00',
                Terminal: 'Imperial Terminal',
                Arrival_Departure: 'Departure',
                Domestic_International: 'Domestic',
                Passenger_Count: 498,
              },
            ],
          },
        },
      });
    }, 1000);
  });
}


const choiceAgent = {
  local: {
    get: (url) => {
      if (url === '/api/journeys/list') {
        return localGetJourneys();
      }
      return null;
    },
    post: (url) => {
      if (url.startsWith('/api/journeys')) {
        return {
          send: (params) => localCreateJourney(params),
        };
      }
      return null;
    },
  },
  online: {
    get: (url) => agent.get(base + url).set('Accept', 'application/json'),
    post: (url) => ({
      send: (params) => agent.post(base + url)
        .set().send(params).catch(),
    }),
  },
};

export default choiceAgent;
