import express from 'express';
import routes from './routes';
import authRoutes from './routes/auth.route';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`server is runnning on localhost:${port}`);
});
