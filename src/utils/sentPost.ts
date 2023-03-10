import { jwtToken } from "./jwtToken";

export const createTicket = async (
  url: string,
  data: object,
  token: string | null | undefined
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const createFeedback = async (
  url: string,
  data: object,
  token: string | null | undefined
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
