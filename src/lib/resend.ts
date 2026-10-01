import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  _resend = new Resend(key);
  return _resend;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM ?? "GOLF AL MAR <orders@golfalmar.com>";
export const OWNER_EMAIL =
  process.env.OWNER_EMAIL ?? "gero.walther@gmail.com";

/**
 * Send via Resend and throw if it was rejected. The SDK reports failures in
 * the returned `error` instead of throwing, which silently swallowed bad
 * keys / unverified senders and still marked orders as "confirmation sent".
 */
export async function sendEmail(
  params: Parameters<Resend["emails"]["send"]>[0],
) {
  const { data, error } = await getResend().emails.send(params);
  if (error) {
    throw new Error(`Resend rejected email to ${String(params.to)}: ${error.message}`);
  }
  return data;
}
