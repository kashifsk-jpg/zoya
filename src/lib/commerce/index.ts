import { whatsappCommerceAdapter } from "./whatsapp-adapter";
import type { CommerceAdapter } from "./types";

export const commerceAdapter: CommerceAdapter = whatsappCommerceAdapter;
export * from "./types";
