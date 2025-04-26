const selfsigned = require("selfsigned");
const fs = require("fs");
const path = require("path");

// Configuration
const certPath = path.join(__dirname, "certificate.crt");
const keyPath = path.join(__dirname, "private.key");

// Générer un certificat auto-signé
const attrs = [
  { name: "commonName", value: "localhost" },
  { name: "countryName", value: "FR" },
  { name: "stateOrProvinceName", value: "Ile-de-France" },
  { name: "localityName", value: "Paris" },
  { name: "organizationName", value: "CloudCampus" },
  { name: "organizationalUnitName", value: "Development" },
];

const pems = selfsigned.generate(attrs, {
  algorithm: "sha256",
  days: 365,
  keySize: 2048,
});

// Sauvegarder les fichiers
fs.writeFileSync(certPath, pems.cert);
fs.writeFileSync(keyPath, pems.private);

console.log("Certificats générés avec succès !");
console.log(`Certificat : ${certPath}`);
console.log(`Clé privée : ${keyPath}`);
