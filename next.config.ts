import dotenvExpand from "dotenv-expand";

dotenvExpand.expand({ parsed: Object.fromEntries(Object.entries(process.env).filter(([, v]) => v !== undefined)) as { [k: string]: string } });

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // Your config
};