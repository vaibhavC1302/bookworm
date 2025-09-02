import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// post book
router.post("/", protectRoute, async (req, res) => {
  console.log("inside book / routes ");
  try {
    const { title, caption, rating, image } = req.body;
    console.log(title, caption, rating, image);

    if (!image || !caption || !title || !rating) {
      console.log("some field missing");
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    // upload image to cloudinary and get an imageUrl
    console.log("uploading image to cloudinary");
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    console.log("uploaded image url:", imageUrl);

    // save to database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    const savedBook = await newBook.save();

    console.log("Saved book ------>", savedBook);
    res.status(200).json(savedBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

// pagination - infinite scroll
router.get("/", protectRoute, async (req, res) => {
  console.log("getting books based on pages and limit");
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    console.log("Fetched books from backend  : ", books);

    res.status(200).json({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error("Error fetching books", error);
    res.send(500).json({ message: "internal server error" });
  }
});

// delete book (only the ccreator can delete the book)
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // check if the current user is the creator of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        console.log("deleting cloudinary image ---->", publicId);
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudError) {
        console.log("Error deleting image from cloudinary", error);
      }
    }

    await book.deleteOne();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get recommended books by the logged in user
router.get("/user", protectRoute, async (req, res) => {
  try {
    console.log("user recommendations");
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Get user books error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
