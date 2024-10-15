import { Request, Response } from "express";
import { twiml, jwt } from 'twilio';
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { STATUS_CODES } from "../constants";
import prisma from '../lib/prisma';

const VoiceResponse = twiml.VoiceResponse;
const AccessToken = jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

let identity: string;

export const generateCallToken = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });
  
      if (!user) {
        return errorResponse({
          res,
          error: "User not found",
          statusCode: STATUS_CODES.NOT_FOUND
        });
    }

    identity = user.id;

    const accessToken = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_API_KEY!,
        process.env.TWILIO_API_SECRET!
    );
    accessToken.identity = identity;
    const grant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID!,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);

    return apiResponse({
      res,
      result: {
        identity: identity,
        token: accessToken.toJwt(),
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      error: "Failed to generate token",
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
    });
  }
};

export const handleVoiceResponse = async (req: Request, res: Response) => {
  try {
    const toNumberOrClientName = req.body.To;
    const callerId = process.env.TWILIO_CALLER_ID!
    let twiml = new VoiceResponse();

    // If the request to the /voice endpoint is TO your Twilio Number, 
    // then it is an incoming call towards your Twilio.Device.
    if (toNumberOrClientName == callerId) {
      let dial = twiml.dial();

      // This will connect the caller with your Twilio.Device/client
      dial.client(identity);
    } else if (req.body.To) {
      let dial = twiml.dial({ callerId });
      const attr = isAValidPhoneNumber(toNumberOrClientName)
        ? "number"
        : "client";
      dial[attr]({}, toNumberOrClientName);
    } else {
      twiml.say("Thanks for calling!");
    }

    res.set('Content-Type', 'text/xml');
    return res.send(twiml.toString());
  } catch (error) {
    return errorResponse({
      res,
      error: "Failed to handle voice response",
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
    });
  }
};

function isAValidPhoneNumber(number: string | number): boolean {
  return /^[\d\+\-\(\) ]+$/.test(number.toString());
}