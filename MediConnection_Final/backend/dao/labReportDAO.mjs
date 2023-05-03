import { ObjectId, Binary } from "mongodb";
import labReport from "../schema/labReport.mjs";

export default class LabReportDAO {
  // static labReports

  // static async injectDB(conn) {
  //   if (labReport) {
  //     return
  //   }

  //   try {
  //     labReport = await conn.db(process.env.DB_NS).collection("lab_reports", {
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in LabReportDAO: ${err}`)
  //   }
  // }

  static async getLabReports({
    filter = {},
    page = 0,
    limit = 10,
    reverse = false,
  }) {
    try {
      const cursor = await labReport
        .find(filter)
        .sort({ _id: reverse ? -1 : 1 })
        .skip(page * limit)
        .limit(limit);
      return cursor;
    } catch (err) {
      return [];
    }
  }

  static async getLabReport(id) {
    return await labReport.findOne({ _id: new ObjectId(id) });
  }

  static async addLabReport({ fromUsername, appointmentId, name, date }) {
    try {
      const response = await labReport.create({
        fromUsername: fromUsername,
        appointmentId: new ObjectId(appointmentId),
        name: name,
        date: new Date(date),
      });

      return { success: true, id: response._id };
    } catch (err) {
      console.error(`Failed to add a new lab report to DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteLabReports(filter) {
    try {
      if (!filter || (filter && !Object.keys(filter).length)) {
        throw Error("No filter provided. Cannot delete all documents.");
      }

      await labReport.deleteMany(filter);

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete lab reports from DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteLabReport(id) {
    try {
      const response = await labReport.deleteOne({ _id: new ObjectId(id) });
      return { success: true };
    } catch (err) {
      console.error(`Failed to delete lab report from DB. ${err}`);
      return { error: err };
    }
  }
}
