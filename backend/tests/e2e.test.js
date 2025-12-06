import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

describe('Testes E2E da API', () => {
    let documentId, documentIdCNPJ;
    const documentData = {
        document: "14335673000",
        type: "CPF"
    };

    const documentDataCNPJ = {
        document: "00000000000191",
        type: "CNPJ"
    };

    beforeAll(async () => {
        const response = await api.post('/auth/login', {
            email: 'admin@example.com',
            password: 'admin',
        });

        expect(response.status).toBe(200);

        const setCookie = response.headers['set-cookie'];
        expect(setCookie).toBeDefined();

        const cookieHeader = setCookie[0];

        api.defaults.headers.Cookie = cookieHeader;
    });

    it('GET /inexistente should return 404 status', async () => {
        try {
            await api.get('/inexistente');
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    it('POST /documents should create a new document successfully', async () => {
        let response = await api.post('/documents', documentData);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('document');
        expect(response.data).toHaveProperty('type');
        documentId = response.data.id;
    });

    it('POST /documents (with CNPJ data) should create a new document successfully', async () => {
        let response = await api.post('/documents', documentDataCNPJ);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('document');
        expect(response.data).toHaveProperty('type');
        documentIdCNPJ = response.data.id;
    });

    it('POST /documents should return error when creating a duplicate document', async () => {
        try {
            let response = await api.post('/documents', documentData);
            fail('Deveria ter lançado um erro 409');
        } catch (error) {
            expect(error.response.status).toBe(409);
            expect(error.response.data).toHaveProperty('error', 'Registro em duplicidade');
        }
    });

    it('GET /documents should return list of documents', async () => {
        const response = await api.get('/documents');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it('GET /documents?type=cpf should return CPF documents', async () => {
        try {
            const response = await api.get('/documents?type=cpf');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            
            response.data.forEach(doc => {
                expect(doc.type).toBe('CPF');
            });
        } catch (error) {
            console.log('Error response:', error.response.data);
            console.log('Error status:', error.response.status);
            throw error;
        }
    });

    it('GET /documents?blocklisted=false should return non-blocklisted documents', async () => {
        try {
            const response = await api.get('/documents?blocklisted=false');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            const documentIds = response.data.map(doc => doc.id);
            expect(documentIds).toContain(documentId);
            expect(documentIds).toContain(documentIdCNPJ);
        } catch (error) {
            console.log('Error response:', error.response.data);
            console.log('Error status:', error.response.status);
            throw error;
        }
    });

    it('GET /documents/:id should return a specific document', async () => {
        response = await api.get(`/documents/${documentId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', documentId);
        expect(response.data).toHaveProperty('type', documentData.type);
        expect(response.data).toHaveProperty('document', documentData.document);
        expect(response.data).toHaveProperty('blocklisted', false);
        expect(response.data).toHaveProperty('createdAt');
        expect(response.data).toHaveProperty('updatedAt');
    });

    it('PATCH /documents/:id should update an existing document', async () => {
        response = await api.patch(`/documents/${documentId}`, { blocklisted: true });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('blocklisted', true);
    });

    it('DELETE /documents/:id should delete an existing document', async () => {
        response = await api.delete(`/documents/${documentId}`);
        expect(response.status).toBe(204);
    });

    it('GET /status deve retornar status da API', async () => {
        const response = await api.get('/status');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('uptime');
        expect(response.data).toHaveProperty('totalRequests');
        expect(typeof response.data.totalRequests).toBe('number');
    });

    it('POST /auth/logout should return 200 status', async () => {
        const response = await api.post('/auth/logout');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message', 'Logout realizado com sucesso');
    });

    afterAll(async () => {
        try {
            await api.delete(`/documents/${documentIdCNPJ}`);
        } catch (error) {
            console.error(`Erro ao remover documento ${documentIdCNPJ}:`, error.response.data);
        }
    });
});
