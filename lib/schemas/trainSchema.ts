import { z } from "zod";

export const trainSchema = z.object({
  trainNumber: z.string().min(3, "Train number is required"),
  trainName: z.string().min(2, "Train name is too short"),
  status: z.enum(["ON_TIME", "DELAYED", "CANCELLED"]),
  arrivalTime: z.string().min(1, "Arrival time required"),
  departureTime: z.string().min(1, "Departure time required"),
});
