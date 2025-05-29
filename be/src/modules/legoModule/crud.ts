import { Request, Response, RequestHandler } from 'express';
import { LegoSet, initialLegoSets } from './initialLegoSets';

// In-memory storage for LEGO sets (replace with database in production)
let legoSets: LegoSet[] = [...initialLegoSets];

// Create a new LEGO set
export const createLegoSet: RequestHandler = (req: Request, res: Response) => {
  try {
    const { setNumber, name, pieces, price, ageRange, theme, releaseYear, imageUrl } = req.body;

    // Validate required fields
    if (!setNumber || !name || !pieces || !price || !ageRange || !theme || !releaseYear || !imageUrl) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Check if set number already exists
    if (legoSets.some(set => set.setNumber === setNumber)) {
      res.status(400).json({ error: 'LEGO set with this set number already exists' });
      return;
    }

    const newLegoSet: LegoSet = {
      id: Math.max(...legoSets.map(set => set.id), 0) + 1,
      setNumber,
      name,
      pieces,
      price,
      ageRange,
      theme,
      releaseYear,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    legoSets.push(newLegoSet);
    res.status(201).json(newLegoSet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create LEGO set' });
  }
};

// Get all LEGO sets
export const getAllLegoSets: RequestHandler = (req: Request, res: Response) => {
  try {
    res.json(legoSets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LEGO sets' });
  }
};

// Get a single LEGO set by ID
export const getLegoSetById: RequestHandler = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const legoSet = legoSets.find(set => set.id === id);

    if (!legoSet) {
      res.status(404).json({ error: 'LEGO set not found' });
      return;
    }

    res.json(legoSet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LEGO set' });
  }
};

// Update a LEGO set
export const updateLegoSet: RequestHandler = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { setNumber, name, pieces, price, ageRange, theme, releaseYear, imageUrl } = req.body;

    const legoSetIndex = legoSets.findIndex(set => set.id === id);

    if (legoSetIndex === -1) {
      res.status(404).json({ error: 'LEGO set not found' });
      return;
    }

    // Check if set number is being changed and if it already exists
    if (setNumber && setNumber !== legoSets[legoSetIndex].setNumber) {
      if (legoSets.some(set => set.setNumber === setNumber)) {
        res.status(400).json({ error: 'LEGO set with this set number already exists' });
        return;
      }
    }

    const updatedLegoSet: LegoSet = {
      ...legoSets[legoSetIndex],
      setNumber: setNumber || legoSets[legoSetIndex].setNumber,
      name: name || legoSets[legoSetIndex].name,
      pieces: pieces || legoSets[legoSetIndex].pieces,
      price: price || legoSets[legoSetIndex].price,
      ageRange: ageRange || legoSets[legoSetIndex].ageRange,
      theme: theme || legoSets[legoSetIndex].theme,
      releaseYear: releaseYear || legoSets[legoSetIndex].releaseYear,
      imageUrl: imageUrl || legoSets[legoSetIndex].imageUrl,
      updatedAt: new Date()
    };

    legoSets[legoSetIndex] = updatedLegoSet;
    res.json(updatedLegoSet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update LEGO set' });
  }
};

// Delete a LEGO set
export const deleteLegoSet: RequestHandler = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const legoSetIndex = legoSets.findIndex(set => set.id === id);

    if (legoSetIndex === -1) {
      res.status(404).json({ error: 'LEGO set not found' });
      return;
    }

    legoSets.splice(legoSetIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete LEGO set' });
  }
};
