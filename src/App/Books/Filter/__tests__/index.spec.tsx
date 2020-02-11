import React from 'react';
import { fireEvent } from '@testing-library/react';

import Filter, { DEFAULT_VALUE } from '../index';
import filterParams from '../../__mocks__/filterParams.json';
import { renderWithRouter } from '../../../../utils/testUtils';

let isFilterOpen = true;
const setIsFilterOpen = (newValue: boolean) => {
  isFilterOpen = newValue;
};

describe('Filter', () => {
  afterEach(() => {
    setIsFilterOpen(true);
  });

  it('should render correctly with given parameters', () => {
    const { getByText, getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy',
      }
    );

    expect(getByText('Datum přidání (výchozí)')).toBeInTheDocument();
    expect(getByText('Název')).toBeInTheDocument();
    expect(getByText('Rok vydání')).toBeInTheDocument();
    expect(getByText('Sestupně (výchozí)')).toBeInTheDocument();
    expect(getByText('Vzestupně')).toBeInTheDocument();
    expect(getByText('5 (výchozí)')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
    expect(getByText('Gay (45)')).toBeInTheDocument();
    expect(getByText('Zahraniční (31)')).toBeInTheDocument();
    expect(getByText('čeština (34)')).toBeInTheDocument();
    expect(getByText('angličtina (2)')).toBeInTheDocument();
    expect(getByText('krátká: do 100 stran (5)')).toBeInTheDocument();
    expect(getByText('střední: od 100 do 200 stran (10)')).toBeInTheDocument();
    expect(getByText('dlouhá: 300 stran a více (63)')).toBeInTheDocument();

    expect(getByLabelText('Řadit podle')).toHaveValue('DATUM_PRIDANI');
    expect(getByLabelText('Pořadí')).toHaveValue('SESTUPNE');
    expect(getByLabelText('Knih na stranu')).toHaveValue('5');
    expect(getByLabelText('Tagy')).toHaveValue([]);
    expect(getByLabelText('Původní jazyk')).toHaveValue(DEFAULT_VALUE);
    expect(getByLabelText('Délka knihy')).toHaveValue(DEFAULT_VALUE);
  });

  it('should render correctly when order by title', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?seraditPodle=NAZEV',
      }
    );

    expect(getByLabelText('Řadit podle')).toHaveValue('NAZEV');
  });

  it('should render correctly when order by year of issue', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?seraditPodle=ROK_VYDANI',
      }
    );

    expect(getByLabelText('Řadit podle')).toHaveValue('ROK_VYDANI');
  });

  it('should render correctly when order is asc', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?poradi=VZESTUPNE',
      }
    );

    expect(getByLabelText('Pořadí')).toHaveValue('VZESTUPNE');
  });

  it('should render correctly for selected tags', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?tagy=gay,zahranicni',
      }
    );

    expect(getByLabelText('Tagy')).toHaveValue(['gay', 'zahranicni']);
  });

  it('should render correctly for selected original language', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?puvodniJazyk=cestina',
      }
    );

    expect(getByLabelText('Původní jazyk')).toHaveValue('cestina');
  });

  it('should render correctly for selected book size', () => {
    const { getByLabelText } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy?delkaKnihy=kratka',
      }
    );

    expect(getByLabelText('Délka knihy')).toHaveValue('kratka');
  });

  it('should submit new filter correctly', async () => {
    const { getByText, getByLabelText, history } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route: '/knihy',
      }
    );

    fireEvent.change(getByLabelText('Řadit podle'), { target: { value: 'NAZEV' } });
    fireEvent.change(getByLabelText('Pořadí'), { target: { value: 'VZESTUPNE' } });
    fireEvent.change(getByLabelText('Knih na stranu'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Tagy'), { target: { value: 'gay' } });
    fireEvent.change(getByLabelText('Původní jazyk'), { target: { value: 'cestina' } });
    fireEvent.change(getByLabelText('Délka knihy'), { target: { value: 'kratka' } });
    fireEvent.click(getByText('Potvrdit'));

    expect(history.location.search).toBe(
      '?delkaKnihy=kratka&knihNaStranku=10&poradi=VZESTUPNE&puvodniJazyk=cestina&seraditPodle=NAZEV&tagy=gay'
    );
    expect(isFilterOpen).toBeFalsy();
  });

  it('should correctly reset filter to default values by reset button', () => {
    const { getByText, history } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route:
          '/knihy?delkaKnihy=kratka&knihNaStranku=10&poradi=VZESTUPNE&puvodniJazyk=cestina&seraditPodle=NAZEV&tagy=gay',
      }
    );

    fireEvent.click(getByText('Vše výchozí'));

    expect(history.location.search).toBe('');
    expect(isFilterOpen).toBeFalsy();
  });

  it('should correctly reset filter to default values by user select', () => {
    const { getByLabelText, getByText, history } = renderWithRouter(
      <Filter filterParams={filterParams} setIsFilterOpen={setIsFilterOpen} />,
      {
        route:
          '/knihy?delkaKnihy=kratka&knihNaStranku=10&poradi=VZESTUPNE&puvodniJazyk=cestina&seraditPodle=NAZEV&tagy=gay',
      }
    );

    fireEvent.change(getByLabelText('Řadit podle'), { target: { value: 'DATUM_PRIDANI' } });
    fireEvent.change(getByLabelText('Pořadí'), { target: { value: 'SESTUPNE' } });
    fireEvent.change(getByLabelText('Knih na stranu'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Tagy'), { target: { value: null } });
    fireEvent.change(getByLabelText('Původní jazyk'), { target: { value: DEFAULT_VALUE } });
    fireEvent.change(getByLabelText('Délka knihy'), { target: { value: DEFAULT_VALUE } });
    fireEvent.click(getByText('Potvrdit'));

    expect(history.location.search).toBe('');
    expect(isFilterOpen).toBeFalsy();
  });
});
