import { Snowflake } from "discord.js";
import { model, Schema, models, Document } from "mongoose";

export interface Sticky extends Document {
  channel_id: Snowflake;
  message_id: Snowflake;
  message: string;
}

const stickySchema = new Schema({
  channel_id: { type: String, required: true },
  message_id: { type: String, required: true },
  message: { type: String, required: true },
});

export default models.Sticky || model<Sticky>("Sticky", stickySchema);
