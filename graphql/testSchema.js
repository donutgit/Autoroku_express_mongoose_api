// schema.js
const _ = require("lodash");

// Authors and Posts get data from JSON Arrays in the respective files.
const Authors = require("../models/Author");
const Posts = require("../models/Post");

const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: function(post) {
        console.log(post);
        return Authors.findById(post.author).exec()
      }
    }
  })
});

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
  name: "BlogAppSchema",
  description: "Blog Application Schema Root",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Authors.find().exec();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts.find().exec();
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        twitterHandle: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newModel = new Authors({
          name: args.name,
          twitterHandle: args.twitterHandle
        });
        return newModel.save();
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newModel = new Posts({
          title: args.title,
          body: args.body,
          author: args.author
        });
        return newModel.save()
      }
    }
  })
});

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType,
  mutation: Mutation
});

module.exports = BlogAppSchema;
