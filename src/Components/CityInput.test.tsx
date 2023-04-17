import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import CityInput from './CityInput';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

describe('CityInput component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and input field', () => {
    render(<CityInput />);
    expect(screen.getByText('Search for a USA Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter an address (Press Enter to search)')).toBeInTheDocument();
  });

  it('triggers the search on Enter key press', async () => {
    render(<CityInput />);
    const input = screen.getByPlaceholderText('Enter an address (Press Enter to search)');
    userEvent.type(input, '4600 Silver Hill Rd, Washington, DC 20233{enter}');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cors-anywhere.herokuapp.com/https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600%20Silver%20Hill%20Rd%2C%20Washington%2C%20DC%2020233&benchmark=2020&format=json',
      )
    });
  });

  
});
