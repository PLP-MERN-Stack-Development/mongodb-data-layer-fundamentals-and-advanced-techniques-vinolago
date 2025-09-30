const { connectDB, client } = require('./db');

// Database and collection name
const dbName = "plp_bookstore";
const collectionName = "books";

// Sample books
const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    published_year: 2020,
    price: 13.99,
    in_stock: true,
    pages: 304,
    publisher: "Canongate Books"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    published_year: 2021,
    price: 16.99,
    in_stock: true,
    pages: 496,
    publisher: "Ballantine Books"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    published_year: 2019,
    price: 14.99,
    in_stock: true,
    pages: 336,
    publisher: "Celadon Books"
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Mystery",
    published_year: 2018,
    price: 15.99,
    in_stock: true,
    pages: 384,
    publisher: "G.P. Putnam's Sons"
  },
  {
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Historical Fiction",
    published_year: 2011,
    price: 12.49,
    in_stock: true,
    pages: 378,
    publisher: "Ecco Press"
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]; 

// Insert books (Task 1)
async function main() {
    try {
        const db = await connectDB(dbName);
        const collection = db.collection(collectionName);

        // Check if books already exist
        const existing = await collection.countDocuments();
        if (existing > 0) {
        console.log(`Collection already has ${existing} documents. Dropping...`);
        await collection.drop();
        console.log("Collection dropped");
        }

        // Insert books
        const result = await collection.insertMany(books);
        console.log(`Inserted ${result.insertedCount} books`);

        // Show inserted books
        const insertedBooks = await collection.find({}).toArray();
        insertedBooks.forEach((book, i) => {
        console.log(`${i + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
        });

        /* BASIC QUERIES (Task 2) */

        // Find all books in specific genre
        const genre = "Adventure";
        const genreBooks = await collection.find({ genre: genre }).toArray();
        console.log(`Books in genre "${genre}:`, genreBooks);

        // Find books published after a certain year
        const year = 1960;
        const booksAfterYear = await collection.find({ published_year: { $gt: year } }).toArray();
        console.log(`Books published after ${year}:`, booksAfterYear);

        // Find books by a specific author
        const author = "Matt Haig";
        const booksByAuthor = await collection.find({ author: author }).toArray();
        console.log(`Books by "${author}":`, booksByAuthor);

        // Update the price of a specific book
        const title = "Pride and Prejudice";
        const newPrice = 18.99;
        const updateResult = await collection.updateOne(
            { title: title },
            { $set: { price: newPrice } }
        );
        console.log(`Updated ${updateResult.modifiedCount} book(s)`);

        // Delete a book by its title
        const titleToDelete = "The Great Gatsby";
        const deleteResult = await collection.deleteOne({ title: titleToDelete });
        console.log(`Deleted ${deleteResult.deletedCount} book(s)`);

        /* ADVANCED QUERIES / PAGINATION WITH PROJECTION + SORT (TASK 3) */

        const page = 1;
        const pageSize = 5;

        const paginatedBooks = await collection
            .find({
                in_stock: true, // the book is available
                published_year: { $gt: 2010 } // published after 2010
            })
            .project({ title: 1, author: 1, price: 1, _id: 0 }) // only return title, author, price
            .sort({ price: -1 }) // Sort by price descending
            .skip((page - 1) * pageSize) // get the first page
            .limit(pageSize)
            .toArray();

        console.log(`Page ${page} - In-stock books after 2010, sorted by price ↓`, paginatedBooks);
        

        /* AGGREGATION  (Task 4) */

        // Calculate the average price of books by genre
        const avgPriceByGenre = await collection.aggregate([
        {
            $group: {
            _id: "$genre",             // Group by genre
            averagePrice: { $avg: "$price" }, // Calculate average price
            count: { $sum: 1 }         // Show how many books per genre
            }
        },
        {
            $sort: { averagePrice: -1 } // Sort by average price descending
        }
        ]).toArray();

        console.log("Average price by genre:", avgPriceByGenre);

        // Find the author with the most books in the collection
        const topAuthor = await collection.aggregate([
        {
            $group: {
            _id: "$author",       // Group by author
            bookCount: { $sum: 1 } // Count number of books
            }
        },
        {
            $sort: { bookCount: -1 } // Sort highest to lowest
        },
        {
            $limit: 1               // Get only the top author
        }
        ]).toArray();

        console.log("Author with most books:", topAuthor);

        // Group books by publication decade and count them
        const booksByDecade = await collection.aggregate([
        {
            $addFields: {
            decade: {
                $multiply: [
                { $floor: { $divide: ["$published_year", 10] } },
                10
                ]
            }
            }
        },
        {
            $group: {
            _id: "$decade",
            count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 } // Sort by decade ascending
        }
        ]).toArray();

        console.log("Books grouped by publication decade:", booksByDecade);

        /* INDEXING (Task 5) */

        // Create index on title 
        await collection.createIndex({ title: 1 }); // 1 means ascending order
        console.log("Index created on 'title'");

        // Now we ca search by title
        await collection.find({ title: "1984" }).toArray();

        // Create compound index on author and published_year

        await collection.createIndex({ author: 1, published_year: 1 });
        console.log("Compound index created on 'author' and 'published_year'");

        // Use explain to show performance improvement
        const explain = await collection.find({ title: "1984" }).explain("executionStats");
        console.log(JSON.stringify(result.executionStats, null, 2));
        console.log(`Query explanation for title="1984":`, explain.executionStats);

        // View all indexes
        const indexes = await collection.indexes();
        console.log("Current Indexes:", indexes);
        


    } catch (err) {
        console.error("❌ Error occurred:", err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

main()
