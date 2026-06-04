#!/usr/bin/env node

/**
 * DLEC Admin Setup Script
 * 
 * Interactive CLI to configure admin credentials.
 * Generates bcrypt-hashed password and a cryptographically random JWT secret.
 * Writes everything to server/.env
 * 
 * Usage: npm run setup-admin
 */

import { createInterface } from 'readline';
import { writeFile, readFile } from 'fs/promises';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '.env');

const rl = createInterface({ input: process.stdin, output: process.stdout });

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

const main = async () => {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║   DLEC Admin Account Setup                   ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // Check if .env already exists
  let existing = false;
  try {
    await readFile(ENV_PATH, 'utf-8');
    existing = true;
    console.log('⚠️  An existing .env file was found.');
    const overwrite = await ask('   Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('\n❌ Setup cancelled. Existing credentials preserved.\n');
      rl.close();
      return;
    }
    console.log('');
  } catch {
    // No existing file — proceed
  }

  // Get username
  const username = (await ask('👤 Admin username (default: admin): ')).trim() || 'admin';

  // Get password with validation
  let password = '';
  while (true) {
    password = (await ask('🔑 Admin password: ')).trim();
    if (password.length < 8) {
      console.log('   ⚠️  Password must be at least 8 characters. Try again.');
      continue;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      console.log('   ⚠️  Password must contain at least one uppercase letter and one number. Try again.');
      continue;
    }
    const confirm = (await ask('🔑 Confirm password: ')).trim();
    if (password !== confirm) {
      console.log('   ⚠️  Passwords do not match. Try again.');
      continue;
    }
    break;
  }

  console.log('\n⏳ Hashing password with bcrypt (12 rounds)...');
  const passwordHash = await bcrypt.hash(password, 12);

  console.log('🔐 Generating JWT secret (64 random bytes)...');
  const jwtSecret = randomBytes(64).toString('hex');

  // Build .env content
  const envContent = [
    '# DLEC Admin Authentication Configuration',
    `# Generated on ${new Date().toISOString()}`,
    '# DO NOT commit this file to version control!',
    '',
    `ADMIN_USERNAME=${username}`,
    `ADMIN_PASSWORD_HASH=${passwordHash}`,
    `JWT_SECRET=${jwtSecret}`,
    '',
  ].join('\n');

  await writeFile(ENV_PATH, envContent, 'utf-8');

  console.log(`\n✅ Admin account configured successfully!`);
  console.log(`   Username:  ${username}`);
  console.log(`   Password:  ${'*'.repeat(password.length)}`);
  console.log(`   Env file:  ${ENV_PATH}`);
  console.log(`\n🚀 Start the server with: npm start\n`);

  rl.close();
};

main().catch((err) => {
  console.error('Setup failed:', err);
  rl.close();
  process.exit(1);
});
