import * as fs from "fs";
import * as path from "path";

const httpsCertificate = () => {
  const isProduction = process.env.PRODUCTION === "true";
  if (!isProduction) {
    return null;
  }

  const certificate =
    "/etc/letsencrypt/live/atmosfera-soltec.online/fullchain.pem";
  const privateKey =
    "/etc/letsencrypt/live/atmosfera-soltec.online/privkey.pem";

  const httpsOptions = {
    key: fs.readFileSync(path.join(privateKey)),
    cert: fs.readFileSync(path.join(certificate)),
  };
  return httpsOptions;
};

export { httpsCertificate };
