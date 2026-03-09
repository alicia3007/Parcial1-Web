import { render, screen } from "@testing-library/react"
import CrearAutor from "../crear/page"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe("Formulario Crear Autor - Render Inicial", () => {

  test("renderiza y vincula semánticamente los campos del formulario", () => {

    render(<CrearAutor />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const birthDateInput = screen.getByLabelText(/fecha/i)
    const descriptionInput = screen.getByLabelText(/descripci/i)
    const imageInput = screen.getByLabelText(/imagen|url/i)

    expect(nameInput).toBeInTheDocument()
    expect(birthDateInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(imageInput).toBeInTheDocument()
  })

  test("el botón de crear autor inicia deshabilitado", () => {``

    render(<CrearAutor />)

    const submitButton = screen.getByRole("button", {
      name: /crear/i
    })

    expect(submitButton).toBeDisabled()
  })

})