{
  "name": "Order",
  "type": "object",
  "properties": {
    "customer_name": {
      "type": "string",
      "description": "Kundenname"
    },
    "customer_email": {
      "type": "string",
      "description": "Kunden E-Mail"
    },
    "customer_phone": {
      "type": "string",
      "description": "Telefonnummer"
    },
    "delivery_address": {
      "type": "string",
      "description": "Lieferadresse"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "product_id": {
            "type": "string"
          },
          "product_name": {
            "type": "string"
          },
          "quantity": {
            "type": "number"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "description": "Bestellte Produkte"
    },
    "total_amount": {
      "type": "number",
      "description": "Gesamtbetrag"
    },
    "status": {
      "type": "string",
      "enum": [
        "neu",
        "in_bearbeitung",
        "versendet",
        "abgeschlossen"
      ],
      "default": "neu",
      "description": "Bestellstatus"
    },
    "notes": {
      "type": "string",
      "description": "Anmerkungen"
    }
  },
  "required": [
    "customer_name",
    "customer_email",
    "items",
    "total_amount"
  ]
}