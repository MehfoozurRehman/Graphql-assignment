const { GraphQLSchema } = require("graphql");
const RootQueryType = require("../datalayer/root/Types");
const RootMutationType = require("../datalayer/root/Types");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
