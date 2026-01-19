  Alke Wallet

Alke Wallet es una aplicación web simulada de banca personal que permite a los usuarios administrar su dinero de manera sencilla. Los usuarios pueden iniciar sesión, depositar dinero, enviar transferencias a contactos y consultar el historial de transacciones, todo desde una interfaz interactiva y visualmente atractiva.

Características

Login seguro con validación de usuario y contraseña.
Depósitos: los usuarios pueden ingresar montos y el saldo se actualiza automáticamente.
Enviar dinero: transferencia de dinero a contactos guardados en la agenda.
Gestión de contactos: agregar y visualizar contactos con CBU, alias y banco.
Historial de transacciones: lista de depósitos y transferencias, con opción de filtrar por tipo.
Responsive Design: diseño adaptativo usando Bootstrap 5, compatible con móviles y escritorio.
Persistencia de datos: usa localStorage para guardar saldo, contactos y transacciones.

Tecnologías utilizadas
HTML5 & CSS3
JavaScript (Vanilla JS, sin jQuery)
Bootstrap 5
LocalStorage del navegador

Instalación y uso
Clonar el repositorio:
git clone https://github.com/tu-usuario/alke-wallet.git
Abrir cualquiera de los archivos .html en un navegador moderno.

Login por defecto:
Email: camilas.cisg@gmail.com
Contraseña: Cami12345

Navegar por el menú para:
Depositar dinero.
Agregar y seleccionar contactos.
Enviar transferencias.
Consultar historial de transacciones.

Consideraciones técnicas
Bootstrap 5 se utiliza para estilos y componentes como botones, listas y alertas.
Modal de contactos: implementado con la clase bootstrap.Modal de Bootstrap 5, sin jQuery.
Persistencia: toda la información de saldo, usuarios y transacciones se almacena en localStorage y se mantiene entre sesiones.
Validaciones:
Login correcto con alerta en caso de error.
Transferencias solo si hay fondos suficientes.
Búsqueda en contactos con filtro en tiempo real.
