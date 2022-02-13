import dbConnect from "../db/dbConnect";

export const postUser = async (userData) => {
  const db = await dbConnect();
  const session = db.session();
  const postQuery = `CREATE (u:USER $userData)`;
  try {
    const writeResult = await session.writeTransaction((tx) =>
      tx.run(postQuery, { userData })
    );
  } catch {
    console.log("Something went wrong");
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
    console.log("Something went wrong");
  } finally {
    await session.close();
    await db.close();
  }
};

//This function is not getting called yet
export const getAllSkills = async () => {
  const db = await dbConnect();
  const session = db.session();
  const query = "MATCH (skills:SKILL) return (skills)";
  const tempData = [];
  try {
    const readResult = await session.readTransaction((tx) => tx.run(query));
    readResult.records.forEach((record) => {
      const skills = record.get("skills");
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
    "MATCH (user:USER {uid:$uid})-[:HAS_A]->(skills:SKILL) RETURN skills";
  try {
    const readResult = await session.readTransaction((tx) =>
      tx.run(query, { uid })
    );
    readResult.records.forEach((record) => {
      const sk = record.get("skills");
      userSkills.push({ ...sk.properties, id: sk.identity.low });
    });
  } catch {
    console.log("Something went wrong!!");
  }
  return userSkills;
};
