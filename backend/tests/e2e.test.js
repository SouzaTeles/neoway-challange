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

    it('/POST should create a new document successfully', async () => {
        let response = await axios.post(`${BASE_URL}/documents`, {
            "document": "14335673000",
            "type": "CPF"
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('document');
        expect(response.data).toHaveProperty('type');
    });
    it('GET /status deve retornar status da API', async () => {
        const response = await axios.get(`${BASE_URL}/status`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('status', 'ok');
        expect(response.data).toHaveProperty('uptime');
        console.log(response.data)
    });
});
