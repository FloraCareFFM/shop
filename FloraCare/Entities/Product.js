{
  "name": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Produktname"
    },
    "description": {
      "type": "string",
      "description": "Produktbeschreibung"
    },
    "short_description": {
      "type": "string",
      "description": "Kurze Beschreibung"
    },
    "price": {
      "type": "number",
      "description": "Preis in Euro"
    },
    "category": {
      "type": "string",
      "enum": [
        "Parf\u00fcm",
        "Bodyscrub",
        "Seife",
        "Deostick"
      ],
      "description": "Produktkategorie"
    },
    "gender": {
      "type": "string",
      "enum": [
        "M\u00e4nner",
        "Frauen",
        "Unisex"
      ],
      "description": "Zielgruppe"
    },
    "scent": {
      "type": "string",
      "description": "Duftrichtung"
    },
    "image_url": {
      "type": "string",
      "description": "Produktbild URL"
    },
    "ingredients": {
      "type": "string",
      "description": "Inhaltsstoffe"
    },
    "stock": {
      "type": "number",
      "default": 0,
      "description": "Lagerbestand"
    },
    "featured": {
      "type": "boolean",
      "default": false,
      "description": "Als Featured Produkt anzeigen"
    },
    "benefits": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Produktvorteile"
    },
    "size": {
      "type": "string",
      "description": "Gr\u00f6\u00dfe/Volumen"
    }
  },
  "required": [
    "name",
    "price",
    "category"
  ]
}