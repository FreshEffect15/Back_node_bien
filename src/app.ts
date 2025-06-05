import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuarioRoutes';
import authRoutes from './routes/authRoutes'; // ✅ así está bien


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Servidor funcionando');
});

app.use('/api/auth', authRoutes);

app.use('/api/usuarios', usuarioRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

