import agent from '../services/http';

const journeyUrl = '/api/journeys';
const listUrl = '/list';


/**
 * Format Journeys with Python style keys to Js style keys
 * @param {*} pythonJourney
 */
export function formatJourney(journey) {
  return {
    reportPeriod: journey.ReportPeriod,
    terminal: journey.Terminal,
    arrivalDeparture: journey.Arrival_Departure,
    domesticInternational: journey.Domestic_International,
    passengerCount: journey.Passenger_Count,
  };
}

export function journeyValues() {
  return [
    'reportPeriod',
    'terminal',
    'arrivalDeparture',
    'domesticInternational',
    'passengerCount',
  ];
}

/**
 * Add a journey to Json file on server
 * @param {Date} reportPeriod
 * @param {String} terminal
 * @param {String} arrivalDeparture
 * @param {String} domesticInternational
 * @param {Int8Array} passengerCount
 */
export async function createJourney(reportPeriod, terminal,
  arrivalDeparture, domesticInternational, passengerCount) {
  const journey = {
    reportPeriod, terminal, arrivalDeparture, domesticInternational, passengerCount,
  };
  const req = agent.online.post(journeyUrl).send({ journey });
  try {
    const { body } = await req;
    return body;
  } catch (err) {
    return err;
  }
}

/**
 * Get the list of journeys
 */
export async function getJourneys() {
  const req = agent.online.get(journeyUrl + listUrl);
  try {
    const { body } = await req;
    return body;
  } catch (err) {
    return err;
  }
}
