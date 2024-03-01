import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express()
const port = 3000
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentación de mi API',
      },
    },
    apis: ['./main.js'], 
  };
  

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
  res.send('Hola World!')
})



import { getAllPosts, getPostById, createPost, updatePost, deletePost} from './db.js'

app.use(express.json())

/**
 * @swagger
 * tags:
 *   name: SWAGGER
 *   description: Endpoints relacionados con los posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts
 *     description: Endpoint para obtener todos los posts.
 *     tags: [SWAGGER]
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error al traer todos los posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts()
    res.json(posts)
})






/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene un post por su ID
 *     description: Endpoint para obtener un post por su ID.
 *     tags: [SWAGGER]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define la estructura del post aquí
 *       '404':
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

// Obtener un post por su ID
app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId
    const post = await getPostById(postId)
    if (post) {
        res.json(post)
    } else {
        res.status(404).json({ error: 'Post not found' })
    }
})

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post
 *     description: Endpoint para crear un nuevo post.
 *     tags: [SWAGGER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define la estructura del post aquí
 *     responses:
 *       '200':
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define la estructura del post creado aquí
 */
// Crear un nuevo post
app.post('/posts', async (req, res) => {
    console.log(req.body)
    const { title, content, marca, modelo, anio, codigo_error, desc_error } = req.body
    const newPost = await createPost(title, content, marca, modelo, anio, codigo_error,desc_error)
    res.json(newPost)
})

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Actualiza un post existente
 *     description: Endpoint para actualizar un post existente.
 *     tags: [SWAGGER]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define la estructura del post a actualizar aquí
 *     responses:
 *       '200':
 *         description: Post actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define la estructura del post actualizado aquí
 *       '404':
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// Actualizar un post existente
app.put('/posts/:postId', async (req, res) => {
    const updatedPost = await updatePost(req.query.title, req.query.content, req.query.marca, req.query.modelo, req.query.anio, req.query.codigo_error, req.query.desc_error,req.query.postid)
    if (updatedPost) {
        res.json(updatedPost)
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Elimina un post
 *     description: Endpoint para eliminar un post.
 *     tags: [SWAGGER]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// Eliminar un post
app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId
    const deletedPost = await deletePost(postId)
    if (deletedPost) {
        res.json({ message: 'Post deleted successfully' })
    } else {
        res.status(404).json({ error: 'Post not found' })
    }
})