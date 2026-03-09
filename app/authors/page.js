"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function AuthorsPage() {
    
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/authors")
            .then(res => res.json())
            .then(data => setAuthors(data))
    }, [])

    const addAuthor = (newAuthor) => {
        setAuthors([...authors, newAuthor])
    }

    const deleteAuthor = (id) => {
        fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setAuthors(authors.filter(author => author.id !== id))
        })
    }

    return (
        <div>
            <h1>Lista de Autores</h1>

            <Link href="/crear">
                Crear Autor
            </Link>

            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        {author.name}
                        <Link href={`/editar/${author.id}`}>
                            <button>Editar</button>
                        </Link>
                        <button onClick={() => deleteAuthor(author.id)}>
                                Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}