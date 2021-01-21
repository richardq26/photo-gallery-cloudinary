## Para el env 
dotenv cross-env

## Para definir un environment
Usar cross-env     
En los scripts:                  
"dev": "cross-env NODE_ENV=development nodemon src/index.js",          
"start": "cross-env NODE_ENV=production node src/index.js"         

### Para subir imágenes en el form      
<form action="/images/add" method="post" enctype="multipart/form-data">