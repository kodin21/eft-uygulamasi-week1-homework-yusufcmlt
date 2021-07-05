const formData = [
  {
    element: "timer",
    time: 520,
  },
  {
    element: "select",
    id: "ibanGonderen",
    label: "Gönderen Hesap IBAN",
    name: "ibanGonderen",
    selectOptions: [
      {
        text: "TR430010009999901234567890 - 5000 TL",
        balance: 5000,
      },
      {
        text: "TR320010009999901994567891 - 4300 TL",
        balance: 4300,
      },
      {
        text: "TR590010009999901234567895 - 1000 TL",
        balance: 1000,
      },
    ],
  },

  {
    element: "input",
    id: "ibanAlici",
    label: "Alıcı Hesap IBAN",
    name: "ibanAlici",
  },
  {
    element: "input",
    type: "number",
    id: "gonderilenMiktar",
    label: "Miktar ₺",
    name: "gonderilenMiktar",
    otherAttributes: `min="0"`,
  },
  {
    element: "button",
    id: "gonderBtn",
    text: {
      available: "Gönder",
      disabled: "Bilgileri girmeden işlem yapamazsınız",
    },
  },
];

export default formData;
