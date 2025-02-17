import inventions from "@/data/inventions.json";

export default function handler(req, res) {
  const { name } = req.query;
  const invention = inventions.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (invention) {
    res.status(200).json(invention);
  } else {
    res.status(404).json({ error: "Unknown invent" });
  }
}
