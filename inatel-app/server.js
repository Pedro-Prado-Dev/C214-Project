const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Função para ler dados do banco de dados simulado
const readDB = () => {
    const data = fs.readFileSync('./db.json');
    return JSON.parse(data);
};

// Função para escrever dados no banco de dados simulado
const writeDB = (data) => {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
};

// Endpoint para autenticação de login
const users = require('./db');

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, message: 'Login bem-sucedido',user: user });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

// Endpoint para obter a grade do aluno
app.get('/api/students/:id/schedule', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const student = db.students.find(s => s.id == id);
    if (student) {
        res.json(student.schedule);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Endpoint para obter as notas do aluno
app.get('/api/students/:id/grades', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const student = db.students.find(s => s.id == id);
    if (student) {
        res.json(student.grades);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Endpoint para obter os horários do dia do aluno
app.get('/api/students/:id/today-schedule', (req, res) => {
    const { id } = req.params;
    const { day } = req.query; // Exemplo: ?day=Monday
    const db = readDB();
    const student = db.students.find(s => s.id == id);
    if (student) {
        const todaySchedule = student.schedule.filter(s => s.day === day);
        res.json(todaySchedule);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Endpoint para obter o registro de faltas do aluno
app.get('/api/students/:id/attendance', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const student = db.students.find(s => s.id == id);
    if (student) {
        res.json(student.attendance);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Endpoint para criar uma nova notificação
app.post('/api/notifications', (req, res) => {
    const { title, content } = req.body;
    const db = readDB();
    const newNotification = {
        id: db.notifications.length + 1,
        title,
        content,
        date: new Date().toISOString()
    };
    db.notifications.push(newNotification);
    writeDB(db);
    res.json({ success: true, message: 'Notificação criada', notification: newNotification });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
