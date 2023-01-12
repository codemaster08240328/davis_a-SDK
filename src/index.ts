import axios from 'axios';
/**
 * 
 * @param endpoint 
 * @returns new Promise which defines as axios request to the endpoint provided.
 */
function fetch<T>(endpoint: string): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * 
 * @param id : string - movie id to get a specific movie - optional
 * @param isQuote : boolean - If true, function will create a quote endpoint for specific movie id. - optional
 * @param pagination : string - supports pagination. eg: page=3&limit=5&offset=3
 * @param sorting : string - supports sorting option. see: https://the-one-api.dev/documentation#5
 * @param filtering : string - supports filtering option. see: https://the-one-api.dev/documentation#5
 * @returns movie endpoint
 */
export function createEndpoint(
  id?: string,
  isQuote?: boolean,
  pagination?: string,
  sorting?: string,
  filtering?: string,
): string {
  let endpoint = '/movie';
  
  if (id) endpoint += `/${id}`; // if id exists, the endpoint = '/movie/{id}'

  if (isQuote) endpoint += '/quote'; // if isQuote, the endpoint = '/movie/{id}/quote'
 
  if (pagination) {
    endpoint += endpoint.includes('?') ? `&${pagination}` : `?${pagination}`;
  }

  if (sorting) {
    endpoint += endpoint.includes('?') ? `&${sorting}` : `?${sorting}`;
  }

  if (filtering) {
    endpoint += endpoint.includes('?') ? `&${filtering}` : `?${filtering}`;
  }

  return endpoint;
}

/**
 * 
 * @param token - provided by user, will be used as an Authorization header.
 * Set axios default configurations like: baseURL, Authorization header.
 */
 export function configure(token: string) {
  axios.defaults.baseURL = 'https://the-one-api.dev/v2';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getMovies<T>(
  pagination?: string,
  sorting?: string,
  filtering?: string,
): Promise<T> {
  const endpoint = createEndpoint(undefined, false, pagination, sorting, filtering);
  return fetch<T>(endpoint);
}

export function getMovieById<T>(
  id: string,
  pagination?: string,
  sorting?: string,
  filtering?: string,
): Promise<T> {
  const endpoint = createEndpoint(id, false, pagination, sorting, filtering);
  return fetch<T>(endpoint);
}

export function getQuote<T>(
  id: string,
  pagination?: string,
  sorting?: string,
  filtering?: string,
): Promise<T> {
  const endpoint = createEndpoint(id, true, pagination, sorting, filtering);
  return fetch<T>(endpoint);
}

export default { 
  configure,
  getMovies,
  getMovieById,
  getQuote
};