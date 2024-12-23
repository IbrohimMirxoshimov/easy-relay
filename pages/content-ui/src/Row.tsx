import { ArrowUpDown, MapPin, Clock, Download, User, Truck } from 'lucide-react';

const TripDetails = () => {
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
      }}>
      {/* Header Section */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}>
            i
          </div>
          <span>44.11 mi deadhead</span>
        </div>

        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#1e4d6c',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              1
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>FTW1 DALLAS, TX 75241-7203</div>
              <div style={{ color: '#666' }}>Wed Dec 11 12:58 CST</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#1e4d6c',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              4
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>LUK2 VANDALIA, Ohio 45377-2564</div>
              <div style={{ color: '#666' }}>Fri Dec 13 11:32 CST</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '24px', color: '#2b6692', fontWeight: 'bold' }}>$2,223.59</div>
            <div style={{ color: '#666' }}>$2.18/mi</div>
          </div>
          <button
            style={{
              backgroundColor: '#2b6692',
              color: 'white',
              padding: '12px 40px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
            Book
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowUpDown size={20} />
            <span>One-way</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={20} />
            <span>4 Stops</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} />
            <span>1,019.2 mi</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} />
            <span>1d 22h</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={20} />
            <span>Provided</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} />
            <span>Solo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={20} />
            <span>53' Trailer</span>
          </div>
        </div>

        {/* Payout Section */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Estimated Payout</h3>
            <span style={{ fontWeight: 'bold' }}>$2,223.59</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>Tour...0853ae88</div>
            <div style={{ color: '#666' }}>$1.81/mi Base rate per mile</div>
          </div>

          {/* Load Details */}
          {[
            { id: '5a00f498', base: 14.34, fuel: 2.93, total: 17.26 },
            { id: '1a60731f', base: 1830.35, fuel: 373.79, total: 2204.14 },
            { id: '8d953f76', base: 1.81, fuel: 0.37, total: 2.18 },
          ].map(load => (
            <div key={load.id} style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '10px' }}>Load...{load.id}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>${load.base.toFixed(2)}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Base Rate</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>${load.fuel.toFixed(2)}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Fuel Surcharge</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>${load.total.toFixed(2)}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Total</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
