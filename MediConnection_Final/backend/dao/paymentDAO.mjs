import { ObjectId } from "mongodb";
import paymentSchema from "../schema/paymentSchema.mjs";

export default class PaymentDAO {
  // static payments

  // static async injectDB(conn) {
  //   if (paymentSchema) {
  //     return
  //   }

  //   try {
  //     paymentSchema = await conn.db(process.env.DB_NS).collection("payments", {
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in PaymentDAO: ${err}`)
  //   }
  // }

  static async getPayments({
    filter = {},
    page = 0,
    limit = 10,
    reverse = false,
  }) {
    try {
      const cursor = await paymentSchema
        .find(filter)
        .sort({ _id: reverse ? -1 : 1 })
        .skip(page * limit)
        .limit(limit);
      return cursor;
    } catch (err) {
      return [];
    }
  }

  static async getPayment(id) {
    return await paymentSchema.findOne({ _id: new ObjectId(id) });
  }

  static async addPayment({
    fromUsername,
    toUsername,
    appointmentId,
    amount,
    date,
  }) {
    try {
      const amountAsNumber = Number(amount);
      if (amountAsNumber === NaN) {
        throw new Error("Invalid input. Amount must be a number.");
      }

      const response = await paymentSchema.create({
        fromUsername: fromUsername,
        toUsername: toUsername,
        appointmentId: appointmentId,
        amount: amountAsNumber,
        date: new Date(date),
      });

      return { success: true, id: response._id };
    } catch (err) {
      console.error(`Failed to add a new payment to DB. ${err}`);
      return { error: err };
    }
  }

  static async deletePayments(filter) {
    try {
      if (!filter || (filter && !Object.keys(filter).length)) {
        throw Error("No filter provided. Cannot delete all documents.");
      }

      await paymentSchema.deleteMany(filter);

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete payments from DB. ${err}`);
      return { error: err };
    }
  }

  static async deletePayment(id) {
    try {
      const response = await paymentSchema.deleteOne({ _id: new ObjectId(id) });
      return { success: true };
    } catch (err) {
      console.error(`Failed to delete payment from DB. ${err}`);
      return { error: err };
    }
  }
}
