const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const { JWT_SECRET } = require("./config");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (roots, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (args.genre) {
          return Book.find({
            author: author.id,
            genres: { $in: args.genre },
          }).populate("author");
        } else {
          return Book.find({
            author: author.id,
          }).populate("author");
        }
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate("author");
      }
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      authors = authors.map(async (author) => {
        author.bookCount = 0;
        const books = await Book.find({}).populate("author");
        books.forEach((book) =>
          book.author.name === author.name
            ? author.bookCount++
            : author.bookCount
        );
        return author.save();
      });
      return authors;
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let isAuthor = await Author.findOne({ name: args.author });
      if (!isAuthor) {
        const author = new Author({ name: args.author });
        try {
          isAuthor = await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: isAuthor._id,
      });

      let addedBook;
      try {
        addedBook = await book.save();
        addedBook = addedBook.populate("author");
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: addedBook });
      return addedBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "sekret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = { resolvers };
