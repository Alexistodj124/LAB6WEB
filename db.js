import conn from './conn.js'
import pool from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function createPost(title, content, marca, modelo, anio, codigo_error, desc_error) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content, marca, modelo, anio, codigo_error, desc_error) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, content, marca, modelo, anio, codigo_error, desc_error])
    return result
}

export async function getPostById(postId) {
    const [result] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    return result
}

export async function updatePost(title, content, marca, modelo, anio, codigo_error, desc_error, postId) {
    try {
        const [result] = await conn.query('UPDATE blog_posts SET title=?, content=?, marca=?, modelo=?, anio=?, codigo_error=?, desc_error=? WHERE id=?', [title, content, marca, modelo, anio, codigo_error, desc_error, postId]);
        return result;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export async function deletePost(postId) {
    try {
        const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
        if (result.affectedRows > 0) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

export async function getAllUsers() {
    const [rows] = await conn.query('SELECT * FROM users')
    return rows
   }


export async function createUser(username,contrasenia) {
    const [result] = await conn.query('INSERT INTO users (username,contrasenia) VALUES (?, ?)', [username,contrasenia])
    return result
}

export async function auth(user, passw) {
    const connection = await pool.getConnection();
    console.log(user)
    console.log(passw)
    try {
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ? AND contrasenia = ?',
        [user, passw]
      );
      return rows.length > 0; // Si hay al menos un usuario con ese nombre de usuario y contraseña, la autenticación es exitosa
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      throw error;
    } finally {
      connection.release();
    }
  }