CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INT NOT NULL,
    codigo_error TEXT NOT NULL,
    desc_error TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);