type Location = {
  id: string;
  address: string;
  equipment: string;
  status: string;
  weight: number;
  arrival: string;
  departure: string;
};

type ShipmentData = {
  totalDistance: string;
  totalTime: string;
  totalCost: string;
  locations: Location[];
};

type ShipmentUIProps = {
  data: ShipmentData;
  onClear: () => void;
};

export const ShipmentUI = ({ data, onClear }: ShipmentUIProps) => {
  // Extracting start and end points
  const startPoint = data.locations[0];
  const endPoint = data.locations[data.locations.length - 1];

  return (
    <div
      style={{ fontFamily: 'Arial, sans-serif', margin: '5px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',

          fontWeight: 'bold',
        }}>
        <span>
          {startPoint.id} {startPoint.address} ➔ {endPoint.id} {endPoint.address}
        </span>
        <span>
          {data.totalDistance} mi | {data.totalTime} | Drop ${data.totalCost}
        </span>
        <span style={{ cursor: 'pointer', fontSize: 20 }} onClick={onClear}>
          x
        </span>
      </div>

      {/* Table */}
      <div>
        {/* Table Header */}
        <div
          style={{
            display: 'flex',
            padding: '10px',
            backgroundColor: '#e9ecef',
            fontWeight: 'bold',
            borderBottom: '1px solid #ddd',
          }}>
          <div style={{ flex: 1 }}>Stop</div>
          <div style={{ flex: 2 }}>Equipment/id</div>
          <div style={{ flex: 1 }}>Arrival</div>
          <div style={{ flex: 1 }}>Departure</div>
        </div>

        {/* Table Rows */}
        {(data.locations as any[]).map((location, index) => (
          <div key={index} style={{ display: 'flex', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>{location.id}</span>
              <br />
              <span style={{ color: '#555' }}>{location.address}</span>
            </div>
            <div style={{ flex: 2 }}>
              <span style={{ fontWeight: 'bold' }}>{location.equipment}</span>
              <br />
              <span style={{ color: '#555' }}>
                {location.status} | {location.weight} lb
              </span>
            </div>
            <div style={{ flex: 1 }}>{location.arrival}</div>
            <div style={{ flex: 1 }}>{location.departure}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
