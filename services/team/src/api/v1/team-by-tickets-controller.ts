import axios from "axios";
import { Request, Response } from "express";

export const teamByTicketsHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = await axios.get(
    `${process.env.TICKET_SERVICE_URL}/api/v1/teams/${id}/tickets`
  );

  return res.status(response.status).json(response.data);
};
