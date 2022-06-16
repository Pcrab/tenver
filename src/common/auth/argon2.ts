import argon2 from "argon2";

export async function encrypt(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
  });
}

export async function verify(hash: string, rawPassword: string) {
  return argon2.verify(hash, rawPassword, {
    type: argon2.argon2id,
  });
}
