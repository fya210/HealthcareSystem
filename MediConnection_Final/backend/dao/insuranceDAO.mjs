import { ObjectId } from "mongodb";
import insuranceSchema from "../schema/insuranceSchema.mjs";

export default class InsuranceDAO {
  // static insurances

  // static async injectDB(conn) {
  //   if (insuranceSchema) {
  //     return
  //   }

  //   try {
  //     insuranceSchema = await conn.db(process.env.DB_NS).collection("insurances", {
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in InsuranceDAO: ${err}`)
  //   }
  // }

  static async getInsurances({ filter = {}, page = 0, limit = 10 }) {
    try {
      const cursor = await insuranceSchema
        .find(filter)
        .skip(page * limit)
        .limit(limit);
      return cursor;
    } catch (err) {
      return [];
    }
  }

  static async getInsurance(id) {
    return await insuranceSchema.findOne({ _id: new ObjectId(id) });
  }

  static async addInsurance({
    username,
    insuranceId,
    providerName,
    expiryDate,
  }) {
    try {
      const response = await insuranceSchema.create({
        username: username,
        insuranceId: insuranceId,
        providerName: providerName,
        expiryDate: new Date(expiryDate),
      });

      return { success: true, id: response._id };
    } catch (err) {
      console.error(`Failed to add a new insurance to DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteInsurances(filter) {
    try {
      if (!filter || (filter && !Object.keys(filter).length)) {
        throw Error("No filter provided. Cannot delete all documents.");
      }

      await insuranceSchema.deleteMany(filter);

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete insurances from DB. ${err}`);
      return { error: err };
    }
  }

  static async deleteInsurance(id) {
    try {
      const response = await insuranceSchema.deleteOne({
        _id: new ObjectId(id),
      });
      return { success: true };
    } catch (err) {
      console.error(`Failed to delete insurance from DB. ${err}`);
      return { error: err };
    }
  }
}
