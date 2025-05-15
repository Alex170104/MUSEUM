import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Exemple de route GET
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur mon API!' });
});

// Exemple de route POST
app.post('/api/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: 'Données reçues!', data });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});