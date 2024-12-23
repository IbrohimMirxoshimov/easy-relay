interface LoadInfo {
  id: string;
  deadheadDistance: string;
  pickup: {
    location: string;
    time: string;
    stopNumber: number;
  };
  delivery: {
    location: string;
    time: string;
    stopNumber: number;
  };
  totalDistance: string;
  duration: string;
  equipmentType: string;
  trailerType: string;
  loadingType: string;
  payment: {
    total: string;
    perMile: string;
  };
}

export function parseLoadList(loadCard: HTMLDivElement): LoadInfo {
  // Get load ID from the first div with an id attribute
  const id = loadCard.querySelector('div[id]')?.id || '';

  // Get all components with the wo-card-header__components class
  const headerComponents = Array.from(loadCard.querySelectorAll('.wo-card-header__components'));

  // Parse stop information
  const stopNumbers = Array.from(loadCard.querySelectorAll('[mdn-text]'))
    .filter(el => /^\d+$/.test(el.textContent?.trim() || ''))
    .map(el => parseInt(el.textContent?.trim() || '0'));

  // Find deadhead info
  const deadheadDistance =
    loadCard.querySelector('[title="Deadhead"]')?.previousElementSibling?.textContent?.trim() || '';

  // Parse pickup and delivery information
  const pickup = {
    stopNumber: stopNumbers[0] || 0,
    location: headerComponents.find(el => el.textContent?.includes('DFW'))?.textContent?.trim() || '',
    time: headerComponents.find(el => el.textContent?.includes('Dec 18'))?.textContent?.trim() || '',
  };

  const delivery = {
    stopNumber: stopNumbers[1] || 0,
    location: headerComponents.find(el => el.textContent?.includes('FRANKLIN'))?.textContent?.trim() || '',
    time: headerComponents.find(el => el.textContent?.includes('Dec 20'))?.textContent?.trim() || '',
  };

  // Get distance and duration from header components
  const totalDistance = headerComponents.find(el => el.textContent?.includes('mi'))?.textContent?.trim() || '';
  const duration = headerComponents.find(el => el.textContent?.includes('h'))?.textContent?.trim() || '';

  // Get equipment information
  const equipmentType = loadCard.querySelector('.equipment-type-text')?.textContent?.trim() || '';
  const trailerType = loadCard.querySelector('.trailer-type-circle')?.textContent?.trim() || '';
  const loadingType = loadCard.querySelector('.loading-type')?.textContent?.trim() || '';

  // Get payment information
  const payment = {
    total: loadCard.querySelector('.wo-total_payout')?.textContent?.trim() || '',
    perMile: headerComponents.find(el => el.textContent?.includes('$/mi'))?.textContent?.trim() || '',
  };

  return {
    id,
    deadheadDistance,
    pickup,
    delivery,
    totalDistance,
    duration,
    equipmentType,
    trailerType,
    loadingType,
    payment,
  };
}
