import React, { ReactElement } from 'react';
import { useFetch } from './hooks';
import Card from './Card';
import './Gallery.css';

type PokemonList = {id: number, name: string}[]

function Gallery(): ReactElement {
    const result = useFetch<PokemonList>('http://localhost:5000/pokemon');

    if (result.isLoading) {
        return (
            <div className='gallery'>
                <p>loading...</p>
            </div>
        );
    }

    if (result.isError) {
        return (
            <div className='gallery'>
                <p>error</p>
            </div>
        )
    }

    return (
        <div className='gallery'>
            {result.data.map((r) => <Card key={r.name} name={r.name} id={r.id} />)}
        </div>
    );
}

export default Gallery;
