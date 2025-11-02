// app/api/auth/[...nextauth]/route.js
export const dynamic = "force-dynamic";
import { handlers } from "../../../../lib/auth";
export const { GET, POST } = handlers;
