import React, { useMemo } from 'react';
import styled from 'styled-components';

interface WeatherData {
  name: string;
  relativeHumidity: {
    value: number;
    unitcode: string;
  };
  temperature: number;
  windDirection: number;
  windSpeed: number;
}

interface WeatherDataRowProps {
  data: WeatherData[];
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 20px auto;
`;

const StyledTableHead = styled.thead`
  background-color: #f2f2f2;
  font-weight: bold;
`;

const StyledTableRow = styled.tr`
  border: 1px solid #ddd;
`;

const StyledTableCell = styled.td`
  padding: 8px;
  text-align: center;
`;

const StyledTableHeaderCell = styled.th`
  padding: 8px;
  text-align: center;
`;

const WeatherDataRow: React.FC<WeatherDataRowProps> = React.memo(({ data }) => (
  <>
    {data.map((weather, index) => (
      
      <StyledTableRow key={index}>
        <StyledTableCell>{weather.name}</StyledTableCell>
        <StyledTableCell>{weather.relativeHumidity.value}{weather.relativeHumidity.unitcode}</StyledTableCell>
        <StyledTableCell>{weather.temperature}</StyledTableCell>
        <StyledTableCell>{weather.windDirection}</StyledTableCell>
        <StyledTableCell>{weather.windSpeed}</StyledTableCell>
      </StyledTableRow>
    ))}
  </>
));

interface WeatherTableProps {
  positions: WeatherData[][];
}

export const WeatherTable: React.FC<WeatherTableProps> = ({ positions }) => {
  const rows = useMemo(
    () => positions.map((position, index) => <WeatherDataRow key={index} data={position} />),
    [positions]
  );

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow>
          <StyledTableHeaderCell>Day</StyledTableHeaderCell>
          <StyledTableHeaderCell>Relative Humidity</StyledTableHeaderCell>
          <StyledTableHeaderCell>Temperature (°C)</StyledTableHeaderCell>
          <StyledTableHeaderCell>Wind Direction (°)</StyledTableHeaderCell>
          <StyledTableHeaderCell>Wind Speed (m/s)</StyledTableHeaderCell>
        </StyledTableRow>
      </StyledTableHead>
      <tbody>{rows}</tbody>
    </StyledTable>
  );
};

export default WeatherTable;
