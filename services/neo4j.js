import dbConnect from '../db/dbConnect';

export const postUser = async (userData) => {
  const db = await dbConnect();
  const session = db.session();
  const postQuery = `CREATE (u:USER $userData)`;
  try {
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(postQuery, { userData })
    );
  } catch {
    console.log('Something went wrong');
  } finally {
    await session.close();
    await db.close();
  }
};

export const userSkillRelationShip = async ({ userId, skillId }) => {
  const db = await dbConnect();
  const session = db.session();
  const query = `MATCH (user:USER {uid:$userId}),(skill:SKILL) WHERE ID(skill)=$skillId CREATE (user)-[:HAS_A]->(skill)`;
  try {
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(query, { userId, skillId })
    );
  } catch (error) {
    console.log('Something went wrong');
  } finally {
    await session.close();
    await db.close();
  }
};

//This function is not getting called yet
export const getAllSkills = async () => {
  const db = await dbConnect();
  const session = db.session();
  const query = 'MATCH (skills:SKILL) return (skills)';
  const tempData = [];
  try {
    const readResult = await session.readTransaction((tx) => tx.run(query));
    readResult.records.forEach((record) => {
      const skills = record.get('skills');
      tempData.push({ ...skills.properties, id: skills.identity.low });
    });
  } catch {
  } finally {
    await session.close();
    await db.close();
  }
  return tempData;
};

export const userWithIdSkills = async (uid) => {
  const db = await dbConnect();
  const session = db.session();
  let userSkills = [];
  const query =
    'MATCH (user:USER {uid:$uid})-[:HAS_A]->(skills:SKILL) RETURN skills';
  try {
    const readResult = await session.readTransaction((tx) =>
      tx.run(query, { uid })
    );
    readResult.records.forEach((record) => {
      const sk = record.get('skills');
      userSkills.push({ ...sk.properties, id: sk.identity.low });
    });
  } catch {
    console.log('Something went wrong!!');
  } finally {
    await session.close();
    await db.close();
  }
  return userSkills;
};

export const removeFriendNeo4j = async (docId, uid) => {
  const db = await dbConnect();
  const session = db.session();
  const query = `MATCH (user1:USER {docId:$docId})-[friend:IS_FRIEND]->(user2:USER {uid:$uid}) DELETE friend`;
  try {
    const readResult = await session.writeTransaction((tx) =>
      tx.run(query, { docId, uid })
    );
  } catch {
    console.log('Err..');
  } finally {
    await session.close();
    await db.close();
  }
};
/// Change UserName
export const updateUserName = async (docId, userName) => {
  const db = await dbConnect();
  const session = db.session();
  const query = `MATCH (user:USER {docId:$docId}) SET user.userName=$userName`;
  try {
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(query, { docId, userName })
    );
  } catch {
  } finally {
    await session.close();
    await db.close();
  }
};
/// Recommendation System for users
export const profilesYouMayKnow = async (selfUID, searchUID) => {
  let r_users = [];
  const db = await dbConnect();
  const session = db.session();
  const queryForFriend = `MATCH (self:USER {uid:$selfUID})-[:IS_FRIEND]->(friend:USER {uid:$searchUID})-[:IS_FRIEND]->(users:USER) WHERE self<>users AND NOT (self)-[:IS_FRIEND]->(users:USER)<-[:IS_FRIEND]-(friend)  WITH users,rand() as r return users ORDER BY r LIMIT 7`;
  try {
    const readResult = await session.readTransaction((tx) =>
      tx.run(queryForFriend, { selfUID, searchUID })
    );

    readResult.records.forEach((record) => {
      const users = record.get('users');
      r_users.push({ ...users.properties });
    });
  } catch {
  } finally {
    await session.close();
    await db.close();
  }
  return r_users;
};

export const removeSkillFromNeo4j = async (uid, skillName) => {
  const db = await dbConnect();
  const session = db.session();
  const query = `MATCH (user:USER {uid:$uid})-[has_a:HAS_A]->(skill:SKILL {name:$skillName}) DELETE has_a`;
  try {
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(query, { uid, skillName })
    );
  } catch (error) {
    console.log('Something went wrong');
  } finally {
    await session.close();
    await db.close();
  }
};
