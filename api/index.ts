import express, { Express, Request, Response } from 'express';
import { activateCamera } from './controllers/signaling'
import { startRecording, stopRecording } from './controllers/recording'
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app: Express = express();
app.use(express.json());
const port = process.env.SERVICE_PORT ? process.env.SERVICE_PORT : 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`OK`);
});

app.post('/viewcamera/:id', async (req: Request, res: Response) => {
  const camId = req.params.id;
  const userName = req.body.userName; // TODO: change to get this username from AD B2C auth token if possible

  const result = await activateCamera(camId, userName);

  res.status(result.status ? 200 : 500).send(result);
});

app.post('/startrecording', async (req: Request, res: Response) => {
  const audioTrackId = req.body.audioTrackId;
  const videoTrackId = req.body.videoTrackId;

  const result = await startRecording(audioTrackId, videoTrackId);

  res.status(result.status ? 200 : 500).send(result);
});

app.post('/stoprecording', async (req: Request, res: Response) => {
  const egressId = req.body.egressId;

  const result = await stopRecording(egressId);

  res.status(result.status ? 200 : 500).send(result);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server running at http://localhost:${port}`);
});
