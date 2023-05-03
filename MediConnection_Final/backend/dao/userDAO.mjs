import { ObjectId, GridFSBucket } from "mongodb";
import userSchema from "../schema/userSchema.mjs";

export default class UserDAO {
  static users;
  static gfs;

  // static async injectDB(conn) {
  //   if (userSchema && this.gfs) {
  //     return
  //   }

  //   try {
  //     userSchema = await conn.db(process.env.DB_NS).collection("users", {
  //       writeConcern: { w: "majority" }
  //     })
  //     this.gfs = new GridFSBucket(conn.db(process.env.DB_NS), {
  //       bucketName: "photos",
  //       writeConcern: { w: "majority" }
  //     })
  //   } catch (err) {
  //     console.error(`Failed to connect to DB in UserDAO: ${err}`)
  //   }
  // }

  static async getUsers({ filter = {}, page = 0, limit = 10 }) {
    try {
      const cursor = await userSchema
        .find(filter)
        .skip(page * limit)
        .limit(limit);
      return cursor;
    } catch (err) {
      console.error(`Failed to retrieve users from DB. ${err}`);
      return [];
    }
  }

  static async searchUsers({
    filter = {},
    searchQuery = {},
    page = 0,
    limit = 10,
  }) {
    try {
      const cursor = await userSchema
        .aggregate([
          {
            $match: filter,
          },
          {
            $addFields: {
              fullName: {
                $concat: ["$firstName", " ", "$lastName"],
              },
            },
          },
        ])
        .match(searchQuery)
        .project({
          fullName: 0,
        })
        .skip(page * limit)
        .limit(limit);
      // console.log("Search users", cursor);
      return cursor;
    } catch (err) {
      console.error(`Failed to search users based on query within DB. ${err}`);
      return [];
    }
  }

  static async getUser(username) {
    try {
      return await userSchema.findOne({ username: username });
    } catch (err) {
      console.error(`Failed to retrieve user from DB. ${err}`);
      return {};
    }
  }

  static async addUser({
    username,
    password,
    firstName,
    lastName,
    isPhysician,
    profilePhotoId,
    dob,
    gender,
    qualification = "",
    specialization = "",
    description = "",
  }) {
    try {
      const response = await userSchema.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        isPhysician: Boolean(isPhysician),
        profilePhotoId: profilePhotoId ? new ObjectId(profilePhotoId) : null,
        dob: new Date(dob),
        gender: gender,
        emailId: "",
        phoneNumber: "",
        qualification: qualification,
        specialization: specialization,
        description: description,
      });

      return { success: true, data: response };
    } catch (err) {
      console.error(`Failed to add a new user. ${err}`);
      return { error: err };
    }
  }

  static async deleteUser(username) {
    try {
      await userSchema.deleteOne({ username: username });

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete user. ${err}`);
      return { error: err };
    }
  }

  static async updateUser(username, updateQuery) {
    try {
      const udpateResponse = await userSchema.updateOne(
        { username: username },
        {
          $set: { ...updateQuery },
        }
      );

      if (udpateResponse.matchedCount === 0) {
        throw new Error("No user found with that username.");
      }

      return { success: true };
    } catch (err) {
      console.error(`Failed to update user in DB. ${err}`);
      return { error: err };
    }
  }

  static async getPhoto(photoId) {
    try {
      const cursor = await this.gfs.find({ _id: new ObjectId(photoId) });
      const files = cursor;

      if (!files || files.length === 0) {
        return null;
      }

      return await this.gfs.openDownloadStream(new ObjectId(photoId));
    } catch (err) {
      // console.error(`Failed to get photo from DB. ${err}`);
      return null;
    }
  }

  static async deletePhoto(photoId) {
    try {
      await this.gfs.delete(new ObjectId(photoId));

      return { success: true };
    } catch (err) {
      console.error(`Failed to delete photo from DB. ${err}`);
      return { error: err };
    }
  }
}
