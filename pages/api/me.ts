import { validateRoute } from "../../lib/auth";

export default validateRoute((_, res, user) => {
  res.json(user);
});
