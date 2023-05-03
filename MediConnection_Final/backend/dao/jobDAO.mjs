import { ObjectId } from "mongodb";
import jobSchema from "../schema/jobSchema.mjs";

export default class JobDAO {
  // static jobs

  // static async injectDB(conn) {
  //   if (jobSchema) {
  //     return
  //   }

  //   try {
  //     jobSchema = await conn.db(process.env.DB_NS).collection("jobs", {
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in JobDAO: ${err}`)
  //   }
  // }

  static async getJobs({ filter = {}, page = 0, limit = 10 }) {
    try {
      const cursor = await jobSchema
        .find(filter)
        .skip(page * limit)
        .limit(limit);
      return cursor;
    } catch (err) {
      return [];
    }
  }

  static async getJob(id) {
    return await jobSchema.findOne({ _id: new ObjectId(id) });
  }

  static async addJob({ username, title, fromDate, toDate, company }) {
    try {
      const response = await jobSchema.create({
        username: username,
        title: title,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        company: company,
      });

      return { success: true, id: response._id };
    } catch (err) {
      console.error(`Failed to add a new job to DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteJobs(filter) {
    try {
      if (!filter || (filter && !Object.keys(filter).length)) {
        throw Error("No filter provided. Cannot delete all documents.");
      }

      await jobSchema.deleteMany(filter);

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete jobs from DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteJob(id) {
    try {
      const response = await jobSchema.deleteOne({ _id: new ObjectId(id) });
      return { success: true };
    } catch (err) {
      console.error(`Failed to delete job from DB. ${err}`);
      return { error: err };
    }
  }
}
