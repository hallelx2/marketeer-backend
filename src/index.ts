import express, { Request, Response, NextFunction, Application } from 'express';


const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
