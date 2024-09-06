import type { AppType } from "api";
import { hc } from "hono/client";

export default hc<AppType>(import.meta.env.VITE_PUBLIC_API_URL as string);
