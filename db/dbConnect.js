const dbConnect = async () => {
  const neo4j = require('neo4j-driver');

  const uri = 'neo4j+s://38091235.databases.neo4j.io';

  const user = 'neo4j';

  const password = 'b-84QhE-zwI13jCujRV5-TiLotYQMlgGlXxz_c1PnHQ';

  return neo4j.driver(uri, neo4j.auth.basic(user, password));
};

export default dbConnect;
