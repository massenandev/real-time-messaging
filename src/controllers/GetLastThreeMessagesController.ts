import { Request, Response } from "express";
import { GetLastThreeMessagesService } from "../services/GetLastThreeMessagesService";

class GetLastThreeMessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLastThreeMessagesService()

    const result = await service.execute()

    return response.json(result)
  }
}

export { GetLastThreeMessagesController }