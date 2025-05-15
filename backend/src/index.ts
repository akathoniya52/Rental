// src/app.ts
import express, { Request, Response } from 'express';
import "dotenv/config";

const PORT = process.env.PORT || 3000;

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const app = express();
app.use(express.json());

let cart: CartItem[] = [];
let idCounter = 1;

// server health
app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({message:"Server is Health is OK.",status:true})
})

app.post('/cart', (req: Request, res: Response) => {
  const item: CartItem = { id: idCounter++, ...req.body };
  cart.push(item);
  res.status(201).json({item:item,status:true, message:"Item added successfully."});
});

app.get('/cart', (_req: Request, res: Response) => {
  res.json({cart:cart,status:true, message : "Item fetched Successfully."});
});

app.put('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart[index] = { id, ...req.body };
    res.json(cart[index]);
  } else {
    res.status(404).json({ status:false, message:"Item not found" });
  }
});

app.delete('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    const removed = cart.splice(index, 1);
    res.json({item: removed[0], status:true, message:"Item removed successfully."});
  } else {
    res.status(404).json({ message: 'Item not found', status:false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
