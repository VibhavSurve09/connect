const dbConnect = async () => {
  const neo4j = require('neo4j-driver');

  const uri = process.env.NEXT_PUBLIC_NEO4J_URI;

  const user = 'neo4j';

  const password = process.env.NEXT_PUBLIC_NEO4J_PASSWORD;

  return neo4j.driver(uri, neo4j.auth.basic(user, password));
};

export default dbConnect;
