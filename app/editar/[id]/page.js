"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

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

        const updatedAuthor = {
            name,
            birthDate,
            description,
            image
        }

    fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAuthor)
    })
        .then(res => res.json())
        .then(() => {
            router.push("/authors")
        })

    }

    return (
        <div>

            <h1>Editar Autor</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button type="submit">
                    Guardar cambios
                </button>

            </form>

        </div>
    )
}
