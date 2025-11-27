import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

describe('Testes E2E da API', () => {
  it('GET / deve retornar mensagem de boas-vindas', async () => {
    const response = await axios.get(`${BASE_URL}/`);
    expect(response.status).toBe(200);
    expect(response.data).toBe('API ok');
  });

  it('GET /inexistente deve retornar 404', async () => {
    try {
      await axios.get(`${BASE_URL}/inexistente`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
