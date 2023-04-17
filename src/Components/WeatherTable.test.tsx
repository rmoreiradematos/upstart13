import { render, screen } from '@testing-library/react';
import WeatherTable from './WeatherTable.tsx';

const mockPositions = [
  [
    {
      name: 'Monday',
      relativeHumidity: { value: 50, unitcode: '%' },
      temperature: 20,
      windDirection: 90,
      windSpeed: 5,
    },
    {
      name: 'Tuesday',
      relativeHumidity: { value: 40, unitcode: '%' },
      temperature: 18,
      windDirection: 180,
      windSpeed: 7,
    },
  ],
  [
    {
      name: 'Wednesday',
      relativeHumidity: { value: 60, unitcode: '%' },
      temperature: 22,
      windDirection: 270,
      windSpeed: 3,
    },
    {
      name: 'Thursday',
      relativeHumidity: { value: 55, unitcode: '%' },
      temperature: 21,
      windDirection: 360,
      windSpeed: 6,
    },
  ],
];

describe('WeatherTable', () => {
  it('renders the table correctly', () => {
    render(<WeatherTable positions={mockPositions} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<WeatherTable positions={mockPositions} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(mockPositions.length * 2);
  });

  it('renders the table headers correctly', () => {
    render(<WeatherTable positions={mockPositions} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('Temperature (°C)')).toBeInTheDocument();
    expect(screen.getByText('Wind Direction (°)')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed (m/s)')).toBeInTheDocument();
  });

  it('renders the WeatherDataRow component correctly for each set of weather data', () => {
    render(<WeatherTable positions={mockPositions} />);
    let weatherDataRows = screen.getAllByRole('row');
    weatherDataRows.shift();
    weatherDataRows.forEach((row, index) => {
      const rowData = mockPositions[Math.floor(index/2)][index%2];
      expect(row).toHaveTextContent(`${rowData.name}${rowData.relativeHumidity.value}${rowData.relativeHumidity.unitcode}${rowData.temperature}${rowData.windDirection}${rowData.windSpeed}`);
    });
  });
  
});
