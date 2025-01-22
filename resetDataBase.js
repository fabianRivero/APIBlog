import mongoose from "mongoose";
import Blog from "./models/Blog.js";
import User from "./models/User.js";
import Email from "./models/Email.js";
import data from "./initialData.js";

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/api-blog";

async function resetDatabase() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Conectado a la base de datos");

    // Eliminar todas las colecciones
    await Blog.deleteMany({});
    await User.deleteMany({});
    await Email.deleteMany({});

    console.log("Datos eliminados");

    if (!Array.isArray(data.blogs) || !Array.isArray(data.users) || !Array.isArray(data.emails)) {
      throw new Error("Los datos iniciales no están estructurados correctamente");
    }

    if (data.blogs.length > 0) {
      await Blog.insertMany(data.blogs);
      console.log(`${data.blogs.length} blogs insertados`);
    }

    if (data.users.length > 0) {
      await User.insertMany(data.users);
      console.log(`${data.users.length} usuarios insertados`);
    }

    if (data.emails.length > 0) {
      await Email.insertMany(data.emails);
      console.log(`${data.emails.length} emails insertados`);
    }

    console.log("Datos iniciales insertados correctamente");

  } catch (error) {
    console.error("Error al reiniciar la base de datos:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("Conexión cerrada");
  }
}

export default resetDatabase;
