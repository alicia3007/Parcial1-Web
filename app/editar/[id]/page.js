"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function EditarAutor() {
    const router = useRouter()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/authors/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name)
                setBirthDate(data.birthDate)
                setDescription(data.description)
                setImage(data.image)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedAuthor = { name, birthDate, description, image }

        fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAuthor)
        })
        .then(res => res.json())
        .then(() => {
            router.push("/authors")
        })
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <div className="form-header">
                    <Link href="/authors" className="back-link">← Volver</Link>
                    <p className="header-eyebrow">Biblioteca</p>
                    <h1 className="form-title">Editar Autor</h1>
                </div>

                <form onSubmit={handleSubmit} className="author-form">

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="name" className="field-label">Nombre completo</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="field-input"
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="birthDate" className="field-label">Fecha de nacimiento</label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="field-input"
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="image" className="field-label">URL de imagen</label>
                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="field-input"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description" className="field-label">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="field-textarea"
                            rows={4}
                        />
                    </div>

                    {image && (
                        <div className="image-preview">
                            <p className="preview-label">Vista previa</p>
                            <img src={image} alt="Preview" className="preview-img" />
                        </div>
                    )}

                    <button type="submit" className="btn-submit">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    )
}
