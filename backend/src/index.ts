import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes';
import coursesRoutes from './routes/courses.routes';
import enrollRoutes from './routes/enrollment.routes';
import authRoutes from './routes/auth.routes';
import rolesRoutes from './routes/roles.routes';
import modalitiesRoutes from './routes/modalities.routes';
import inscriptionStatusRoutes from './routes/inscriptionStatus.routes';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_ADDRESS,
    credentials: true,
}));

app.use(usersRoutes);
app.use(coursesRoutes);
app.use(enrollRoutes);
app.use(authRoutes);
app.use(rolesRoutes)
app.use(modalitiesRoutes)
app.use(inscriptionStatusRoutes)

app.get('/', async(req, res) => {
    res.json("Hello World");
})


// TODO: Crear los dto para crear usuarios, cursos y registros.