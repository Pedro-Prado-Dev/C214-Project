// app.test.js
// Importa os dados de usuários do módulo '../db'
const users = require('../../db');


test('verifica um usuario valido', () => {
    const username = 'admin';
    const password = 'admin';
    const user = users.find(u => u.username === username && u.password === password);
    
    expect(user).toBeDefined();
});

test('verifica um usuario invalido', () => {
    const username = 'usuario_invalido';
    const password = 'senha_invalida';
    const user = users.find(u => u.username === username && u.password === password);
    
    expect(user).toBeUndefined();
});
  