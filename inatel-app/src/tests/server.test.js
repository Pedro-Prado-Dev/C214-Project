const fs = require('fs');
const path = require('path');

// Mock do módulo fs
jest.mock('fs');

// Função auxiliar para simular a leitura do arquivo db.json
const mockReadDB = () => {
    // Dados simulados do arquivo db.json
    const dbData = JSON.stringify({
        students: [
            {
                id: 1,
                name: 'admin',
                schedule: [
                    { day: 'Monday', time: '09:00', subject: 'C208 - B - I16' },
                    { day: 'Monday', time: '10:00', subject: 'C214 - B - I20' }
                ],
                grades: {
                    0: { NP1: 7.5, NP2: 8.0 },
                    1: { NP1: 6.0, NP2: 7.5 }
                },
                attendance: [
                    { date: '2024-06-01', status: 'present' },
                    { date: '2024-06-02', status: 'absent' }
                ]
            },
            {
                id: 2,
                name: 'Maria',
                schedule: [
                    { day: 'Monday', time: '09:00', subject: 'C208 - B - I16' },
                    { day: 'Monday', time: '09:00', subject: 'C208 - B - I16' }
                ],
                grades: {
                    History: { NP1: 8.0, NP2: 9.0 },
                    Math: { NP1: 7.0, NP2: 8.5 }
                },
                attendance: [
                    { date: '2024-06-01', status: 'present' },
                    { date: '2024-06-03', status: 'absent' }
                ]
            },
            {
                id: 3,
                name: 'Carlos',
                schedule: [
                    { day: 'Monday', time: '09:00', subject: 'C208 - B - I16' },
                    { day: 'Monday', time: '09:00', subject: 'C208 - B - I16' }
                ],
                grades: {
                    Science: { NP1: 6.5, NP2: 7.5 },
                    Math: { NP1: 8.0, NP2: 8.5 }
                },
                attendance: [
                    { date: '2024-06-01', status: 'present' },
                    { date: '2024-06-04', status: 'absent' }
                ]
            }
        ],
        notifications: [
            {
                id: 1,
                title: 'New Schedule Update',
                content: 'Please check the new updated schedule.',
                date: '2024-06-10T10:00:00Z'
            },
            {
                id: 2,
                title: 'Exam Reminder',
                content: "Don't forget about the upcoming exams next week.",
                date: '2024-06-11T15:00:00Z'
            }
        ]
    });
    // Simula a função fs.readFileSync para retornar os dados simulados
    fs.readFileSync.mockReturnValue(dbData);
    // Retorna os dados parseados como JSON
    return JSON.parse(dbData);
};

// Função para ler os dados do banco de dados (db.json)
const readDB = () => {
    // Lê o arquivo db.json
    const data = fs.readFileSync('../../db.json');
    // Retorna os dados parseados como JSON
    return JSON.parse(data);
};

// Função para escrever dados no banco de dados (db.json)
const writeDB = (data) => {
    // Escreve os dados no arquivo db.json
    fs.writeFileSync('../../db.json', JSON.stringify(data, null, 2));
};

// Define os testes
describe('Funções do Banco de Dados', () => {
    // Executa antes de cada teste
    beforeEach(() => {
        // Limpa todas as instâncias e chamadas aos métodos mockados
        jest.clearAllMocks();
    });

    // Teste para verificar se a leitura do banco de dados está correta
    test('deve ler o banco de dados corretamente', () => {
        // Dados simulados do mock
        const db = mockReadDB();
        // Lê os dados usando a função readDB
        const data = readDB();
        // Verifica se os dados lidos são iguais aos dados simulados
        expect(data).toEqual(db);
    });

    // Teste para verificar se a escrita no banco de dados está correta
    test('deve escrever no banco de dados corretamente', () => {
        // Dados simulados do mock
        const db = mockReadDB();
        // Escreve os dados usando a função writeDB
        writeDB(db);
        // Verifica se a função fs.writeFileSync foi chamada corretamente
        expect(fs.writeFileSync).toHaveBeenCalledWith('../../db.json', JSON.stringify(db, null, 2));
    });
});
