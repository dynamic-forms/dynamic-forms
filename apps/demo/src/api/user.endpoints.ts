import { RequestHandler, rest } from "msw"

export const USER_ENDPOINTS: RequestHandler[] = [
  rest.get('/api/users/name/unique/:name', (req, res, ctx) => {
    const username = req.params.name as string;
    const usernames = [ 'username01', 'username02', 'username03'];
    return res(ctx.json(!usernames.includes(username)));
  }),
];
