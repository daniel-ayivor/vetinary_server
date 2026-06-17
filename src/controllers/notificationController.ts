import { Response } from "express";
import { AuthRequest } from "../middleware/Middleware";
import { User, Notification } from "../models";
import mongoose from "mongoose";

export const sendNotification = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      user_id,
      title,
      description,
      email,
      tone = "info",
      subject,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required",
      });
    }

    let normalizedUserId = null;

    if (
      user_id &&
      user_id !== "undefined" &&
      user_id !== "null" &&
      user_id.trim()
    ) {
      if (mongoose.Types.ObjectId.isValid(user_id)) {
        normalizedUserId = user_id;
      }
    }

    let recipientEmail = email;

    if (normalizedUserId && !recipientEmail) {
      const recipient = await User.findById(normalizedUserId);
      recipientEmail = recipient?.email;
    }

    if (!recipientEmail) {
      return res.status(400).json({
        message: "Recipient email not found",
      });
    }

    try {
      const sendMail = require("../utils/mailer");

      await sendMail({
        to: recipientEmail,
        subject: subject || title,
        text: description,
        html: `<p>${description}</p>`,
      });
    } catch (emailErr) {
      console.error("Failed to send email notification:", emailErr);
    }

    const notificationData: {
      title: string;
      message: string;
      isRead: boolean;
      tone: string;
      recipient?: string;
    } = {
      title,
      message: description,
      isRead: false,
      tone,
    };

    if (normalizedUserId) {
      notificationData.recipient = normalizedUserId;
    }

    const notification = await Notification.create(notificationData);

    res.status(201).json({
      id: notification._id.toString(),
      user_id: normalizedUserId || null,
      title: notification.title,
      description: notification.message,
      tone,
      read: notification.isRead,
      created_at: notification.createdAt.toISOString(),
    });
  } catch (err: any) {
    console.error("Error in sendNotification:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};