import { render, screen, fireEvent } from "@testing-library/react"
import CrearAutor from "../crear/page"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe("Formulario Crear Autor - Validaciones", () => {

  test("muestra mensajes de error cuando se envía vacío", () => {
    render(<CrearAutor />)

    const form = document.querySelector("form")

    fireEvent.submit(form)

    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument()
    expect(screen.getByText("La fecha es obligatoria")).toBeInTheDocument()
    expect(screen.getByText("La descripción es obligatoria")).toBeInTheDocument()
    expect(screen.getByText("La imagen es obligatoria")).toBeInTheDocument()
  })

  test("el botón permanece deshabilitado mientras haya campos inválidos", () => {
    render(<CrearAutor />)

    const boton = screen.getByRole("button", { name: /crear autor/i })
    const nameInput = screen.getByLabelText(/nombre completo/i)

    fireEvent.change(nameInput, {
      target: { value: "Gabriel García Márquez" }
    })

    expect(boton).toBeDisabled()
  })

})