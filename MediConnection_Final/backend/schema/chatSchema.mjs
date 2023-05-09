import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isPhysician: {
    type: Boolean,
    required: true
  },
  profilePhotoId: {
    type: mongoose.Schema.Types.ObjectId,
  }
});

const chatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 1,
      description: "Title of chat.",
    },
    host: {
      type: userSchema,
      required: true,
      description: "host of chat.",
    },
    startTime: {
      type: Date,
      required: true,
      description: "Start time of chat.",
    },
    members: {
      type: [String],
      required: true,
      minLength: 1,
      description: "List of usernames of members within chat.",
    },
    activeMembers: {
      type: [String],
      required: true,
      minLength: 1,
      description: "List of usernames of members active within chat.",
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      description: "Associated appointment Id for chat.",
    },
  },
  {
    strict: "throw",
    collection: "chats",
  }
);

export default mongoose.model("Chat", chatSchema);

// export default async function createChatSchema(conn) {
//   await Chat.init();
//   // console.log(`Chats collection using schema was created.`);
// }









// export default async function createChatSchema(conn) {
//   await conn.db("medicus").createCollection("chats", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         title: "chats",
//         additionalProperties: false,
//         properties: {
//           _id: {
//             bsonType: "objectId"
//           },
//           title: {
//             bsonType: ["string"],
//             minLength: 1,
//             description: "Title of chat."
//           },
//           host: {
//             bsonType: ["string"],
//             minLength: 1,
//             description: "Username of host of chat."
//           },
//           startTime: {
//             bsonType: ["date"],
//             description: "Start time of chat."
//           },
//           members: {
//             bsonType: ["array"],
//             minLength: 1,
//             description: "List of usernames of members within chat."
//           },
//           activeMembers: {
//             bsonType: ["array"],
//             minLength: 1,
//             description: "List of usernames of members active within chat."
//           },
//           appointmentId: {
//             bsonType: ["objectId", null],
//             description: "Associated appointment Id for chat."
//           }
//         },
//         required: ["title", "members", "host", "startTime"]
//       }
//     },
//     validationLevel: "strict",
//     validationAction: "error"
//   })

//   // console.log(`Chats collection using schema was created.`)
// }
