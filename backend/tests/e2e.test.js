import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

describe('Testes E2E da API', () => {
    let documentId;
    const documentData = {
        document: "14335673000",
        type: "CPF"
    };
    it('GET /inexistente should return 404 status', async () => {
        try {
            await axios.get(`${BASE_URL}/inexistente`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    it('POST /documents should create a new document successfully', async () => {
        let response = await axios.post(`${BASE_URL}/documents`, documentData);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('document');
        expect(response.data).toHaveProperty('type');
        documentId = response.data.id;
    });

    it('POST /documents should return error when creating a duplicate document', async () => {
        try {
            let response = await axios.post(`${BASE_URL}/documents`, documentData);
            fail('Deveria ter lançado um erro 409');
        } catch (error) {
            expect(error.response.status).toBe(409);
            expect(error.response.data).toHaveProperty('error', 'Registro em duplicidade');
        }
    });

    it('GET /documents should return list of documents', async () => {
        const response = await axios.get(`${BASE_URL}/documents`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it('GET /documents/:id should return a specific document', async () => {
        response = await axios.get(`${BASE_URL}/documents/${documentId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', documentId);
        expect(response.data).toHaveProperty('type', documentData.type);
        expect(response.data).toHaveProperty('document', documentData.document);
        expect(response.data).toHaveProperty('blocklisted', false);
        expect(response.data).toHaveProperty('createdAt');
        expect(response.data).toHaveProperty('updatedAt');
    });

    it('PATCH /documents/:id should update an existing document', async () => {
        response = await axios.patch(`${BASE_URL}/documents/${documentId}`, { blocklisted: true });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('blocklisted', true);
    });

    it('DELETE /documents/:id should delete an existing document', async () => {
        response = await axios.delete(`${BASE_URL}/documents/${documentId}`);
        expect(response.status).toBe(204);
    });

    it('GET /status deve retornar status da API', async () => {
        const response = await axios.get(`${BASE_URL}/status`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('uptime');
        expect(response.data).toHaveProperty('totalRequests');
        expect(typeof response.data.totalRequests).toBe('number');
    });

});
