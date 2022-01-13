# Litebox Challenge
![enter image description here](https://liteflix-challenge-llopez.herokuapp.com/static/media/liteflix.7e304b0d0d1cfe7d37aa1f43dff275cc.svg)

Desarrollado con React.js por [Laureano López](https://www.linkedin.com/in/lopezlaureanogonzalo/), durante Enero de 2022.

**Acceso público:** https://liteflix-challenge-llopez.herokuapp.com/

## Caso

El proyecto consiste en el desarrollo un **Catálogo de Películas** dinámico.

Se deberá listar una película destacada, y películas populares provenientes de una API pública.

Sin embargo, el catálogo puede ser actualizado por el usuario, pudiendo agregar nuevas películas a la categoría “Mis Películas”. No se dispone de un endpoint para agregar nuevas películas, sino que simplemente deben guardarse imágenes en localStorage.
## Capturas
![enter image description here](https://i.ibb.co/TW2Q3Tg/Captura.jpg)
![https://i.ibb.co/K2d6xRV/Improvementsss.jpg](https://i.ibb.co/K2d6xRV/Improvementsss.jpg)![https://i.ibb.co/7vHsXm2/Captursa.jpg](https://i.ibb.co/7vHsXm2/Captursa.jpg)
## Consideraciones

 - No se utilizó una librería de componentes, ya que para la finalidad del challenge, se prefirió crear componentes estilizados puros en CSS, importando solo aquellos que presentaban un alto grado de complejidad.
 - Se utilizaron los endpoints brindados por Litebox para las consultas al API de TMDB. Para probar localmente, agregar el API Key requerido para comunicarse con dicho endpoint.
 - Dada que la persistencia se realiza en localStorage, para "simular" el proceso de error y éxito en la carga de la imagen, se consideró que **toda película cuyo nombre no incluya "Liteflix" en su título causará un error en la subida**. Probar con distintos nombres para verificar que la funcionalidad anda correctamente.
 - Las imágenes y películas mostradas son aleatorias de los resultados arrojados por TMDB. Se sesgaron aquellas películas con nombres muy largos que podrían ocasionar problemas en la interfaz de usuario.
 - La implementación se llevó a cabo persiguiendo principios de Responsive Design. Se utilizó un total aproximado de 35 horas para el desarrollo.
## Tengo un problema
Cualquier inconveniente, duda o bug, por favor avisar a lopez96lau@gmail.com para poder darle solución inmediata.


Si llegaste hasta acá, **muchas gracias**! Que lo disfrutes! ![:hugging_face:](https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-medium/1f917@2x.png)
