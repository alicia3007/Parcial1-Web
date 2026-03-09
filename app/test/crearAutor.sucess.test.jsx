import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CrearAutor from "../crear/page"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe("Formulario Crear Autor - Flujo exitoso", () => {

  test("limpia errores y habilita el botón cuando los datos son válidos", async () => {

    render(<CrearAutor />)

    const user = userEvent.setup()

    const form = document.querySelector("form")

    fireEvent.submit(form)

    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument()

    await user.type(
      screen.getByLabelText(/nombre completo/i),
      "Gabriel García Márquez"
    )

    await user.type(
      screen.getByLabelText(/url de imagen/i),
      "https://imagen.com/gabo.jpg"
    )

    await user.type(
      screen.getByLabelText(/descripción/i),
      "Autor colombiano ganador del Nobel"
    )

    await user.type(
      screen.getByLabelText(/fecha de nacimiento/i),
      "1927-03-06"
    )

    const boton = screen.getByRole("button", { name: /crear autor/i })

    expect(boton).toBeEnabled()

    expect(screen.queryByText("El nombre es obligatorio")).not.toBeInTheDocument()
    expect(screen.queryByText("La fecha es obligatoria")).not.toBeInTheDocument()
    expect(screen.queryByText("La descripción es obligatoria")).not.toBeInTheDocument()
    expect(screen.queryByText("La imagen es obligatoria")).not.toBeInTheDocument()

  })

})