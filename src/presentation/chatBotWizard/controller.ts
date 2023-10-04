import { CustomError } from "../../domain";
import type { Request, Response } from "express";
import { ChatBotWizardRoutes } from "./routes";
import output from "../../../tests/examples/output_event.json";

export class ChatBotWizardController {
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  sendInputChatBotWizard = async (req: Request, res: Response) => {
    try {
      const io = ChatBotWizardRoutes.io;
      io.emit("chat-message-response", output.body.data.nodes);
      res.send("Guardado Correctamente");
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
