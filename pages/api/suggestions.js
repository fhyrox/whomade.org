import inventions from "@/data/inventions.json";

export default function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(200).json([]);

  const suggestions = inventions
    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({ label: item.name, value: item.name }));

  res.status(200).json(suggestions);
}
