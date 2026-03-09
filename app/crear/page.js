"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CrearAutor()
{
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

        const newAuthor = {
            name,
            birthDate,
            description,
            image
        }

        fetch("http://127.0.0.1:8080/api/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAuthor)
        })
        .then(res => res.json())
        .then(data => {
            router.push("/authors")
        }) 
    }

    return (
        <div>
            <h1>Crear Autor</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby="name-error"
                    />
                    {errors.name && (
                        <p id="name-error" role="alert" style={{color:"red"}}>
                            {errors.name}
                        </p>
                    )}

                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    aria-invalid={errors.birthDate ? "true" : "false"}
                    aria-describedby="birthDate-error"
                    />
                    {errors.birthDate && (
                        <p id="birthDate-error" role="alert" style={{color:"red"}}>
                            {errors.birthDate}
                        </p>
                    )}

                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-invalid={errors.birthDate ? "true" : "false"}
                        aria-describedby="birthDate-error"
                    />
                    {errors.description && (
                        <p id="description-error" role="alert" style={{color:"red"}}>
                            {errors.description}
                        </p>
                    )}

                <input
                    type="text"
                    placeholder="Imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    aria-invalid={errors.image ? "true" : "false"}
                    aria-describedby="image-error"
                    />
                    {errors.image && (
                        <p id="image-error" role="alert" style={{color:"red"}}>
                            {errors.image}
                        </p>
                    )}
                <button type="submit">
                    Crear Autor
                </button>

                </form>
        </div>
    )
}