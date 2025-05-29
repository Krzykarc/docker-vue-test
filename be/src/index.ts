import express, { Request, Response, Router, NextFunction, RequestHandler } from 'express';
import {
  createLegoSet,
  getAllLegoSets,
  getLegoSetById,
  updateLegoSet,
  deleteLegoSet
} from './modules/legoModule/crud';

const app = express();
const router = Router();
const port = 3000;

// CORS middleware
const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
};

app.use(corsMiddleware);

// Middleware
app.use(express.json());

// LEGO CRUD endpoints
router.post('/api/lego-sets', createLegoSet);
router.get('/api/lego-sets', getAllLegoSets);
router.get('/api/lego-sets/:id', getLegoSetById);
router.put('/api/lego-sets/:id', updateLegoSet);
router.delete('/api/lego-sets/:id', deleteLegoSet);

// Root endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({"Hello": "World"});
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 