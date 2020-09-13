
# Trabajo practico N°1 PROGRAMACION DISTRIBUIDAS II
Este proyecto esta realizado con Go 
- Aqui tiene el sitio oficial https://golang.org/ 

# MODO DE INSTALACION

En el sitio oficial dispone de una versión binaria adecuada para su sistema, siga las instrucciones de instalación.
https://golang.org/dl/ 
# Linux
Si tiene instalada una versión anterior de Go, asegúrese de eliminarla antes de instalar otra.

1. Descargue el archivo y extráigalo en /usr/local, creando un árbol de Go en /usr/local/go.
Por ejemplo, ejecute lo siguiente como root o mediante sudo:

>> tar -C /usr/local -xzf go1.14.3.linux-amd64.tar.gz

2. Agregue /usr/local/go/bin a la PATH variable de entorno.
Puede hacer esto agregando la siguiente línea a su $ HOME / .profile o /etc/profile (para una instalación en todo el sistema):

>> export PATH=$PATH:/usr/local/go/bin

3. Verifique que ha instalado Go abriendo un símbolo del sistema y escribiendo el siguiente comando:

>> $ go version
# Windows
1. Abra el archivo MSI que descargó y siga las instrucciones para instalar Go.
- De forma predeterminada, el instalador instalará Go to C:\Go. Puede cambiar la ubicación según sea necesario. Después de la instalación, deberá cerrar y volver a abrir las solicitudes de comando abiertas para que los cambios en el entorno realizados por el instalador se reflejen en la línea de comandos.

2. Verifique que haya instalado Go.
    - En Windows , haga clic en el menú Inicio .
    - En el cuadro de búsqueda del menú, escriba cmd y luego presione la tecla Intro.
    - En la ventana del símbolo del sistema que aparece, escriba el siguiente comando:
>> $ go versión

# INSTALACION DE LIBRERIAS ADICIONALES USADAS
>> go get "libreria"
# MODO DE EJECUCION
Para correr el proyecto deben pararse en    /API-REST  y ejecutar el siguiente comando:
go run main.go

repositorio para la materia de programación distribuida 2 de la Undav


# MODO DE EJEMPLO
 https://golang.org/doc/tutorial/getting-started 