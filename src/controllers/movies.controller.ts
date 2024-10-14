import { Request, Response } from 'express';

import {
    createMovie,
    deleteMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
} from '../services/movies.service';

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await getAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
};

export const getMovie = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid movie id' });
        }

        const movies = await getMovieById(id);

        if (!movies) {
            res.status(404).json({ error: 'Movies not found' });
        }

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the movies ' });
    }
};

export const updateMovieById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid movie id' });
        }

        const updatedMovie = await updateMovie(id, req.body);
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update movie', success: false });
    }
};

export const deleteMovieById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid movie id' });
        }

        const deletedMovie = await deleteMovie(id);
        res.json({ message: 'Movie deleted', deletedMovie, success: true });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete movie', success: false });
    }
};

export const createNewMovie = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            duration,
            trailer_url,
            poster_url,
            director_ids,
            actor_ids,
            genre_ids,
        } = req.body;

        if (
            !title ||
            !description ||
            !duration ||
            !trailer_url ||
            !poster_url ||
            !director_ids ||
            !actor_ids ||
            !genre_ids
        ) {
            res.status(400).json({ error: 'Missing required fields', success: false });
        }

        const newMovie = await createMovie({
            title,
            description,
            duration,
            trailer_url,
            poster_url,
            director_ids: director_ids || [],
            actor_ids: actor_ids || [],
            genre_ids: genre_ids || [],
        });

        res.status(201).json({ message: 'Movie successfully created', newMovie, success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create movie', success: false });
    }
};
