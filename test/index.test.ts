import axios from "axios";
import { configure, createEndpoint, getMovieById, getMovies, getQuote } from "../src";
import * as MOCK_MOVIES_DATA from "./__mock__/movies.json";
import * as MOCK_QUOTES_DATA from "./__mock__/quotes.json";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createEndpoint', () => {
  it('without parameter', () => {
    expect(createEndpoint()).toBe('/movie');
  });

  it('get_movie endpoint by id', () => {
    expect(createEndpoint('id')).toBe('/movie/id');
  });

  it('get_movie_quote endpoint by id', () => {
    expect(createEndpoint('id', true)).toBe('/movie/id/quote');
  });

  it('movie endpoint with pagination', () => {
    const pagination = 'page=1&limit=20';
    expect(createEndpoint(undefined, undefined, pagination)).toBe(`/movie?${pagination}`);
  });

  it('movie endpoint with sorting parameter', () => {
    const sorting = 'sort=name:asc';
    expect(createEndpoint(undefined, undefined, undefined, sorting)).toBe(`/movie?${sorting}`);
  });

  it('movie endpoint with filtering parameter', () => {
    const filtering = 'name=Gandalf';
    expect(createEndpoint(undefined, undefined, undefined, undefined, filtering)).toBe(`/movie?${filtering}`);
  });

  it('movie endpoint with pagination and sorting parameter', () => {
    const pagination = 'page=1&limit=20';
    const sorting = 'sort=name:asc';
    expect(createEndpoint(undefined, undefined, pagination, sorting)).toBe(`/movie?${pagination}&${sorting}`);
  })

  it('movie endpoint with sorting and filtering parameter', () => {
    const filtering = 'name=Gandalf';
    const sorting = 'sort=name:asc';
    expect(createEndpoint(undefined, undefined, undefined, sorting, filtering)).toBe(`/movie?${sorting}&${filtering}`);
  })
});

describe('SDK', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('quote')) {
        return Promise.resolve({
          data: MOCK_QUOTES_DATA
        })
      }

      if (url.includes('/movie/any_id')) {
        return Promise.resolve({
          data: {
            docs: [MOCK_MOVIES_DATA.docs[0]]
          }
        })
      }

      return Promise.resolve({
        data: MOCK_MOVIES_DATA
      })
    })
  });

  it('Setting SDK configure works fine', async () => {
    configure('any_token');

    expect(mockedAxios.defaults.baseURL).toBe('https://the-one-api.dev/v2')
    expect(mockedAxios.defaults.headers.common['Authorization']).toBe('Bearer any_token')
  })

  it('getMovies works fine', async () => {
    const data = await getMovies();

    expect(data).toBe(MOCK_MOVIES_DATA);
  })

  it('getQuote works fine', async () => {
    const data = await getQuote('any_id');

    expect(data).toBe(MOCK_QUOTES_DATA);
  })

  it('getMovieById works fine', async () => {
    const data = await getMovieById<{docs: Array<unknown>}>('any_id');
    
    expect(data.docs).toHaveLength(1);
    expect(data.docs[0]).toBe(MOCK_MOVIES_DATA.docs[0]);
  })
});