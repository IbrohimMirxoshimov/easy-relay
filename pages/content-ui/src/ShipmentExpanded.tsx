import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { Relay } from './relay.type';

function formatDuration(seconds: number): string {
  if (seconds <= 0) return '0m';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;

  return result.trim();
}

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
          duration={formatDuration(workOpportunity.totalDuration / 1000)}
          payout={load.payout.value}
          loadType={load.loadType.toLowerCase()}
        />
      ))}
    </div>
  );
};

interface LoadTableProps {
  load: Relay.Load;
  index: number;
  totalMiles: number;
  duration: string;
  payout: number;
  loadType: string;
}

export const LoadTable: React.FC<LoadTableProps> = ({ load, index, totalMiles, duration, payout, loadType }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div style={{ border: '1px solid #D1D5DB', overflow: 'hidden' }}>
      <div
        onClick={toggleExpand}
        style={{
          backgroundColor: '#F3F4F6',
          padding: '0.5rem',
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
                {load.stops[0].location.city} → {load.stops[load.stops.length - 1].location.city}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>{totalMiles.toFixed(2)} mi</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>${payout.toFixed(2)}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{loadType}</div>
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
                  <td style={{ padding: '0.75rem 1rem' }}>
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
                        <span style={{ fontSize: '0.875rem', color: 'rgb(5, 93, 123)' }}>{stopIndex + 1}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{stop.location.line1}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                          {stop.location.city}, {stop.location.state} {stop.location.postalCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                      {stop.trailerDetails[0]?.assetType || "53' Trailer"}
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        {stop.loadingType || stop.unloadingType}
                      </div>
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
