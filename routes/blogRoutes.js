import express from 'express';
import Blog from '../models/Blog.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

//para obtener todos los blogs con el filtrado por categoria
//GET /blogs?tags=adelgazamiento,fuerza
router.get('/blogs', async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 6;
    const page = parseInt(req.query.page) || 1;
    const filter = {};
    if (req.query.tags) {
        const tagsArray = req.query.tags.split(',');
        filter.tags = { $in: tagsArray };
    }
    
    try {
        const blogs = await Blog.find(filter)
        // .sort({ publicationDate: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
        const total = await Blog.countDocuments(filter);

        res.status(200).json({
            blogs,
            page,
            pages: Math.ceil(total / pageSize),
            currentPage: page,
    });    
    } catch (error) {
        res.status(500).json({error: "Somthin went wrong", details: error.message});
    }
});

//para obtener un blog en especifico
router.get("/blogs/:id", async (req, res) => {
try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog: blog })
} catch (error) {
    res.status(500).json({ message: "Server error " + error.message })
}
});

//para crear un nuevo blog
//POST api/blogs/all-blogs
router.post("/blogs", [auth, admin], async (req, res) => {
    let blog;
    blog = new Blog({
        id: uuidv4(),
        title: req.body.title,
        linkTitle: req.body.linkTitle,
        description: req.body.description,
        publicationDate: req.body.publicationDate,
        tags: req.body.tags,
        cardImage: req.body.cardImage,
        content: req.body.content,
        extendedDate: req.body.extendedDate,
    });
    try {
        console.log("antes de salvar")
        await blog.save();
        console.log("despues de salvar")
        return res.status(200).json({ blog: blog });
    } catch (error) {
        res.status(500).json(`Something went wrong: ${error.message}`);
    };
});

//para editar un blog existente
router.put('/blogs/:id', [auth, admin], async (req, res) => {
    const updates = req.body;
    try {
        const blog = await Blog.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ blog: blog });
    } catch (error) {
        res.status(500).json({ message: "Server error " + error.message });
    }
});

//para borrar un blog existente
router.delete('/blogs/:id', [auth, admin], async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ id: req.params.id });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ blog: blog });

    } catch (error) {
        res.status(404).json({ message: "Server error " + error.message });
    }
});


//para comentar o calificar un blog
router.patch('/blogs/:id', [auth], async (req, res) => {
    const updates = req.body;
    try {
        const blog = await Blog.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ blog: blog });
    } catch (error) {
        res.status(500).json({ message: "Server error " + error.message });
    }
});

export default router;