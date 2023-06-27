import { dynamodb } from "@/config/AWS";
import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

// Next.js API route
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { chatid, userMessage, response } = req.body;

    let conversation = await getConversation(chatid);
    if (!conversation) {
      conversation = [];
    }
    const updatedConversation = [...conversation, { userMessage, response }];
    await updateConversation(chatid, updatedConversation);

    res.status(200).json({ message: "Message stored successfully." });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};

const getConversation = async (chatid: any) => {
  const params = {
    TableName: "chats",
    Key: { chatid },
  };

  const { Item } = await dynamodb.get(params).promise();

  if (Item && Item.conversation) {
    return Item.conversation;
  }

  return [];
};

const updateConversation = async (chatid: any, updatedConversation: any) => {
  const params = {
    TableName: "chats",
    Item: {
      chatid: chatid,
      conversation: updatedConversation,
    },
    ConditionExpression: "attribute_not_exists(chatid)", // Ensures that the chatid doesn't exist
  };

  try {
    await dynamodb.put(params).promise();
  } catch (error: any) {
    if (error.code === "ConditionalCheckFailedException") {
      // If the conversation already exists, update the existing item
      const updateParams = {
        TableName: "chats",
        Key: { chatid },
        UpdateExpression: "SET conversation = :conversation",
        ExpressionAttributeValues: {
          ":conversation": updatedConversation,
        },
      };

      await dynamodb.update(updateParams).promise();
    } else {
      throw error;
    }
  }
};
// AWS.config.update({
//   region: "your-dynamodb-region",
//   accessKeyId: "your-access-key",
//   secretAccessKey: "your-secret-key",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { userId, userMessage, response } = req.body;
//   const timestamp = new Date().toISOString();
//   const chatid = uuidv4();

//   const params = {
//     TableName: "chats",
//     Item: {
//       chatid: { S: chatid },
//       userID: { S: userId },
//       timestamp: { S: timestamp },
//       userMessage: { S: userMessage },
//       response: { S: response },
//     },
//   };

//   try {
//     await dynamoDB.putItem(params as any).promise();
//     res.status(200).json({ message: "Chat saved successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error saving chat!" });
//   }
// }