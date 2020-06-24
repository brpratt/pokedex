import React, { ReactElement } from 'react';
import { useFetch } from './hooks';
import './Card.css';

interface CardProps {
    id: number
    name: string
}

interface Pokemon {
    id: number
    name: string
    types: string[]
}

export function capitalize(str: string): string {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

function Card(props: CardProps): ReactElement {
    const result = useFetch<Pokemon>(`http://localhost:5000/pokemon/${props.id}`);

    if (result.isLoading) {
        return (
            <div className='card card-loading'>
                <div className='card-header'>
                    <p>{capitalize(props.name)}</p>
                </div>
                <div className='card-body'>
                    <p>loading...</p>
                </div>
            </div>
        );
    }

    if (result.isError) {
        return (
            <div className='card card-error'>
                <div className='card-header'>
                    <p>{capitalize(props.name)}</p>
                </div>
                <div className='card-body'>
                    <p>error</p>
                </div>
            </div>
        );
    }
    return (
        <div className='card'>
            <div className={`card-header card-header-${result.data.types[0]}`}>
                <p>{capitalize(props.name)}</p>
            </div>
            <div className={`card-body card-body-${result.data.types[0]}`}>
                <img src={`http://localhost:8000/sprites/${props.id}`} alt={props.name}/>
                <div className='types'>
                    {result.data.types.map((type) =>
                        <div key={type} className={`type-banner type-banner-${type}`}>
                            <p>{capitalize(type)}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;