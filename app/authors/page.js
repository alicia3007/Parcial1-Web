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

    const deleteAuthor = (id) => {
        fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setAuthors(authors.filter(author => author.id !== id))
        })
    }

    return (
        <div className="page">
            <header className="page-header">
                <div className="header-content">
                    <p className="header-eyebrow">Biblioteca</p>
                    <h1 className="header-title">Autores</h1>
                    <p className="header-count">{authors.length} {authors.length === 1 ? "autor registrado" : "autores registrados"}</p>
                </div>
                <Link href="/crear" className="btn-primary">
                    + Nuevo Autor
                </Link>
            </header>

            {authors.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">✦</span>
                    <p>No hay autores registrados aún.</p>
                    <Link href="/crear" className="btn-secondary">Crear el primero</Link>
                </div>
            ) : (
                <ul className="authors-grid">
                    {authors.map((author) => (
                        <li key={author.id} className="author-card">
                            <div className="card-image-wrapper">
                                {author.image ? (
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="card-image"
                                    />
                                ) : (
                                    <div className="card-image-placeholder">
                                        {author.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="card-overlay" />
                            </div>

                            <div className="card-body">
                                <div className="card-meta">
                                    {author.birthDate && (
                                        <span className="card-date">
                                            {new Date(author.birthDate).getFullYear()}
                                        </span>
                                    )}
                                </div>
                                <h2 className="card-name">{author.name}</h2>
                                {author.description && (
                                    <p className="card-description">{author.description}</p>
                                )}
                            </div>

                            <div className="card-actions">
                                <Link href={`/editar/${author.id}`} className="btn-edit">
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteAuthor(author.id)}
                                    className="btn-delete"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
