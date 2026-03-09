"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CrearAutor() {
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!name) newErrors.name = "El nombre es obligatorio"
        if (!birthDate) newErrors.birthDate = "La fecha es obligatoria"
        if (!description) newErrors.description = "La descripción es obligatoria"
        if (!image) newErrors.image = "La imagen es obligatoria"

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        const newAuthor = { name, birthDate, description, image }

        fetch("http://127.0.0.1:8080/api/authors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAuthor)
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
                    <h1 className="form-title">Nuevo Autor</h1>
                </div>

                <form onSubmit={handleSubmit} className="author-form" noValidate>

                    <div className="form-row">
                        <div className={`form-field ${errors.name ? "has-error" : ""}`}>
                            <label htmlFor="name" className="field-label">Nombre completo</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Ej: Gabriel García Márquez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={errors.name ? "true" : "false"}
                                aria-describedby="name-error"
                                className="field-input"
                            />
                            {errors.name && (
                                <p id="name-error" role="alert" className="field-error">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className={`form-field ${errors.birthDate ? "has-error" : ""}`}>
                            <label htmlFor="birthDate" className="field-label">Fecha de nacimiento</label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                aria-invalid={errors.birthDate ? "true" : "false"}
                                aria-describedby="birthDate-error"
                                className="field-input"
                            />
                            {errors.birthDate && (
                                <p id="birthDate-error" role="alert" className="field-error">
                                    {errors.birthDate}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={`form-field ${errors.image ? "has-error" : ""}`}>
                        <label htmlFor="image" className="field-label">URL de imagen</label>
                        <input
                            id="image"
                            type="text"
                            placeholder="https://ejemplo.com/foto.jpg"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            aria-invalid={errors.image ? "true" : "false"}
                            aria-describedby="image-error"
                            className="field-input"
                        />
                        {errors.image && (
                            <p id="image-error" role="alert" className="field-error">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div className={`form-field ${errors.description ? "has-error" : ""}`}>
                        <label htmlFor="description" className="field-label">Descripción</label>
                        <textarea
                            id="description"
                            placeholder="Breve biografía del autor..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            aria-invalid={errors.description ? "true" : "false"}
                            aria-describedby="description-error"
                            className="field-textarea"
                            rows={4}
                        />
                        {errors.description && (
                            <p id="description-error" role="alert" className="field-error">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {image && (
                        <div className="image-preview">
                            <p className="preview-label">Vista previa</p>
                            <img src={image} alt="Preview" className="preview-img" />
                        </div>
                    )}

                    <button type="submit" className="btn-submit">
                        Crear Autor
                    </button>
                </form>
            </div>
        </div>
    )
}
