import * as v from 'valibot';

export const MovieFormSchema = v.object({
    id: v.pipe(
        v.string(),
        v.nonEmpty('* Please enter Movie ID.'),
        v.minLength(1, '* Enter at least 1 character'),
        v.maxLength(4, '* Should not exceed 4 characters'),
    ),
    title: v.pipe(
        v.string(),
        v.nonEmpty('* Please enter the movie title.'),
        v.minLength(2, '* Title must be at least 2 characters'),
        v.maxLength(100, '* Title should not exceed 100 characters'),
    ),
    year: v.pipe(
        v.string(),
        v.nonEmpty('* Please enter the release year.'),
        v.minLength(4, '* Year must be 4 digits'),
        v.maxLength(4, '* Year must be 4 digits'),
    ),
    genre: v.pipe(
        v.string(),
        v.nonEmpty('* Please enter a genre.'),
        v.minLength(3, '* Genre must be at least 3 characters'),
        v.maxLength(40, '* Genre should not exceed 40 characters'),
    ),
    rating: v.pipe(
        v.string(),
        v.nonEmpty('* Please enter a rating (e.g. PG, PG-13, R, 5 stars)'),
        v.minLength(1, '* Rating must be at least 1 character'),
        v.maxLength(10, '* Rating should not exceed 10 characters'),
    ),
});
