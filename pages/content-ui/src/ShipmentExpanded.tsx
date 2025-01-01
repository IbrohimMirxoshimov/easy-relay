import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { Relay } from './relay.type';

interface LoadTablesProps {
  workOpportunity: Relay.WorkOpportunity;
}
export const LoadTables: React.FC<LoadTablesProps> = ({ workOpportunity }) => {
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      {workOpportunity.loads.map((load, index) => (
        <LoadTable
          key={load.versionedLoadId.id}
          load={load}
          index={index}
          totalMiles={load.distance.value}
          payout={load.payout.value}
          expanded={index === 0}
        />
      ))}
    </div>
  );
};

interface LoadTableProps {
  load: Relay.Load;
  index: number;
  totalMiles: number;
  payout: number;
  expanded: boolean;
}

export const LoadTable: React.FC<LoadTableProps> = ({ load, index, totalMiles, payout, expanded }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div style={{ border: '1px solid #D1D5DB', overflow: 'hidden' }}>
      <div
        onClick={toggleExpand}
        style={{
          backgroundColor: '#F3F4F6',
          padding: '1rem 1rem',
          cursor: 'pointer',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#F3F4F6')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#6B7280' }}>#{index + 1}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin style={{ width: '1rem', height: '1rem', color: 'rgb(5, 93, 123)' }} />
              <span style={{ fontWeight: 500 }}>
                {getCityAndState(load.stops[0])} → {getCityAndState(load.stops[load.stops.length - 1])}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {load.loadType === Relay.LoadType.Bobtail && (
                <div style={{ fontSize: '0.875rem', color: 'red', fontWeight: 500 }}>Bobtail</div>
              )}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>{totalMiles.toFixed(2)} mi</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>${payout.toFixed(2)}</div>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} />
            ) : (
              <ChevronDown style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          <table style={{ width: '100%' }}>
            <thead style={{ backgroundColor: '#F9FAFB', borderCollapse: 'separate' }}>
              <tr>
                <th
                  style={{
                    padding: '0.5rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#6B7280',
                    width: 400,
                  }}>
                  Stop
                </th>
                <th
                  style={{
                    padding: '0.5rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#6B7280',
                  }}>
                  Equipment/id
                </th>
                <th
                  style={{
                    padding: '0.5rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#6B7280',
                  }}>
                  Arrival
                </th>
                <th
                  style={{
                    padding: '0.5rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#6B7280',
                  }}>
                  Departure
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white', borderTop: '1px solid #E5E7EB' }}>
              {load.stops.map((stop, stopIndex) => (
                <tr key={stopIndex} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '0.75rem 0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgb(182, 227, 255)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <span style={{ fontSize: '0.875rem', color: 'rgb(5, 93, 123)' }}>
                          {stop.stopSequenceNumber}
                        </span>
                      </div>
                      <div>
                        {stop.locationCode && (
                          <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{stop.locationCode}</div>
                        )}
                        <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                          {stop.location.line1 ? stop.location.line1 + ', ' : ''} {stop.location.city},{' '}
                          {stop.location.state} {stop.location.postalCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                      <div>
                        {renderLoadType(load.loadType)} {renderEqupmentType(load.equipmentType)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        {stop.loadingType || stop.unloadingType}
                      </span>
                      {stop.weight?.value && stop.weight?.value > 10 ? (
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          {' | '}
                          {formatNumberShort(stop.weight.value)} lb
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                      {new Date(stop.actions[0]?.plannedTime).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short',
                        timeZone: stop.location.timeZone,
                        hour12: false,
                      })}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                      {new Date(stop.actions[1]?.plannedTime).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short',
                        timeZone: stop.location.timeZone,
                        hour12: false,
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

function formatNumberShort(value: number): string {
  if (value >= 1_000) {
    return (value / 1_000).toFixed(0) + 'K';
  }

  return value.toString();
}

function renderLoadType(loadType: Relay.LoadType) {
  switch (loadType) {
    case Relay.LoadType.Loaded:
      return <i className="fa fa-circle"></i>;
    case Relay.LoadType.Bobtail:
      return <i className="fa fa-circle-o"></i>;
    case Relay.LoadType.Empty:
      return <i className="fa fa-circle-o"></i>;
    default:
      return '@';
  }
}

function renderEqupmentType(type: Relay.EquipmentType) {
  switch (type) {
    case Relay.EquipmentType.FiftyThreeFootTruck:
      return "53' Trailer";
    case Relay.EquipmentType.FiftyThreeFootContainer:
      return "53' Container";
    case Relay.EquipmentType.CubeTruck:
      return 'CubeTruck';
    case Relay.EquipmentType.TwentySixFootBoxTruck:
      return "26' FootBox";
    default:
      return type;
  }
}

function getCityAndState(stop: Relay.Stop) {
  let text = stop.location.city;

  if (stop.location.state) {
    text = `${text}, ${stop.location.state}`;
  }

  if (stop.locationCode) {
    text = `${stop.locationCode}, ${text}`;
  }

  return text;
}
