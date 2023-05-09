import { ObjectId } from "mongodb";
import degreeSchema from "../schema/degreeSchema.mjs";

export default class DegreeDAO {
  // static degrees

  // static async injectDB(conn) {
  //   if (degreeSchema) {
  //     return
  //   }

  //   try {
  //     degreeSchema = await conn.db(process.env.DB_NS).collection("degrees", {
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in DegreeDAO: ${err}`)
  //   }
  // }

  // static async getDegrees({filter={}, page=0, limit=10}) {
  //   try {
  //     const cursor = await degreeSchema.find(filter).skip(page*limit).limit(limit)
  //     return cursor
  //   } catch (err) {
  //     return []
  //   }
  // }

  static async getDegree(id) {
    return await degreeSchema.findOne({ _id: new ObjectId(id) });
  }

  static async addDegree({ username, degree, fromDate, toDate, university }) {
    try {
      const response = await degreeSchema.create({
        username: username,
        degree: degree,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        university: university,
      });

      return { success: true, id: response._id };
    } catch (err) {
      console.error(`Failed to add a new degree to DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteDegrees(filter) {
    try {
      if (!filter || (filter && !Object.keys(filter).length)) {
        throw Error("No filter provided. Cannot delete all documents.");
      }

      await degreeSchema.deleteMany(filter);

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete degrees from DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteDegree(id) {
    try {
      const response = await degreeSchema.deleteOne({ _id: new ObjectId(id) });
      return { success: true };
    } catch (err) {
      console.error(`Failed to delete degree from DB. ${err}`);
      return { error: err };
    }
  }
}
