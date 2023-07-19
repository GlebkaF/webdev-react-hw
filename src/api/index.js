export async function getTracks() {
  const json = await fetch(
    'https://painassasin.online/catalog/track/all/',
  ).then((res) => res.json())

  return json
}
