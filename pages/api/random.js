export default function handler(req, res) {
  const inventions = require('../../data/inventions.json')

  const randomIndex = Math.floor(Math.random() * inventions.length);
  const randomInvention = inventions[randomIndex];

  res.status(200).json({name:randomInvention.name});
}