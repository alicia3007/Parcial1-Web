Parte 3: Documentación y README

1. Guía de ejecución

    - Para comenzar, necesitamos que se encuentre corriendo el back del book, por lo que tenemos que tener la imágen creada (tener docker abierto) y corriendo por medio del comando docker build ./ -t bookstore (para crear) y docker run -d -p 127.0.0.1:8080:8080 bookstore (para correr) 
    
    - Ahora, necesitamos todo lo de npm, por lo que lo instalamos (npm install) y ya al finalizar la aplicación y probarla utilizamos el comando (npm run dev). 

    - Con respecto a las pruebas jest, también necesitamos múltiples librerías y que todas se encuentren corriendo, por lo que instalamos todas las dependencias que necesitamos y corremos las pruebas por medio del comando (npm test). 


2. Reporte de cambios

    Con respecto a la estratégia utilizada para que los datos persistieran entre rutas, lo que me pareció más sencillo es seguir con las reglas CRUD, específicando de qué API venía cada dato y obligando que cada creación de dato realizara "push" en el API (al igual que se realizaran los cambios de eliminación y de edición). 

    Sobre la lógica de filtrado, se realizó un "search box" por medio del cual se especifica al usuario que la búsqueda debe ser por nombre. Si se encuentra uno o varios autores con ese nombre, estos aparecen, sino es el caso aparece un mensaje indicando que el nombre del autor no se encuentra en la lista. 


3. Aclaraciones adicionales 

    Como el botón de "Crear Autor" según las intrucciones de las pruebas, debe quedar desactivado, se optó mostrar el error cada vez que el usuario se hace en un espacio para escribir y lo deja vacío, ahí le aparece un mensaje indicando que todos los campos son obligatorios. 