import { currencyInterface } from "@/typeInterfaces/payout.interface.js";


const availableCurrencies =  [
    {
      _id: "66a7993ed098b924da78e119",
      currency_name: "British Pound Sterling",
      currency_symbol: "GBP",
    },
    {
      _id: "66a79959d098b924da78e11b",
      currency_name: "Canadian Dollar",
      currency_symbol: "CAD",
    },
    {
      _id: "66a7996ed098b924da78e11d",
      currency_name: "Central African CFA Franc",
      currency_symbol: "XAF",
    },
    {
      _id: "66a79981d098b924da78e11f",
      currency_name: "Chilean Peso",
      currency_symbol: "CLP",
    },
    {
      _id: "66a79991d098b924da78e121",
      currency_name: "Colombian Peso",
      currency_symbol: "COP",
    },
    {
      _id: "66a799a7d098b924da78e123",
      currency_name: "Egyptian Pound",
      currency_symbol: "EGP",
    },
    {
      _id: "66a799b5d098b924da78e125",
      currency_name: "SEPA",
      currency_symbol: "EUR",
    },
    {
      _id: "66a799cad098b924da78e127",
      currency_name: "Ghanaian Cedi",
      currency_symbol: "GHS",
    },
    {
      _id: "66a799dcd098b924da78e129",
      currency_name: "Guinean Franc",
      currency_symbol: "GNF",
    },
    {
      _id: "66a799edd098b924da78e12b",
      currency_name: "Kenyan Shilling",
      currency_symbol: "KES",
    },
    {
      _id: "66a79a09d098b924da78e12d",
      currency_name: "Malawian Kwacha",
      currency_symbol: "MWK",
    },
    {
      _id: "66a79a1ed098b924da78e12f",
      currency_name: "Moroccan Dirham",
      currency_symbol: "MAD",
    },
    {
      _id: "66a79a2fd098b924da78e131",
      currency_name: "Nigerian Naira",
      currency_symbol: "NGN",
    },
    {
      _id: "66a79a41d098b924da78e133",
      currency_name: "Rwandan Franc",
      currency_symbol: "RWF",
    },
    {
      _id: "66a79a54d098b924da78e135",
      currency_name: "Sierra Leonean Leone",
      currency_symbol: "SLL",
    },
    {
      _id: "66a79a66d098b924da78e137",
      currency_name: "São Tomé and Príncipe dobra",
      currency_symbol: "STD",
    },
    {
      _id: "66a79a78d098b924da78e139",
      currency_name: "South African Rand",
      currency_symbol: "ZAR",
    },
    {
      _id: "66a79a8dd098b924da78e13b",
      currency_name: "Tanzanian Shilling",
      currency_symbol: "TZS",
    },
    {
      _id: "66a79a9bd098b924da78e13d",
      currency_name: "Ugandan Shilling",
      currency_symbol: "UGX",
    },
    {
      _id: "66a79aacd098b924da78e13f",
      currency_name: "United States Dollar",
      currency_symbol: "USD",
    },
    {
      _id: "66a79acfd098b924da78e141",
      currency_name: "West African CFA Franc BCEAO",
      currency_symbol: "XOF",
    },
    {
      _id: "66a79ae2d098b924da78e143",
      currency_name: "Zambian Kwacha",
      currency_symbol: "ZMW",
    }
];

type _currencyInteeface = {
  _id: string;
  currency_name: string;
  currency_symbol: string;
}

export function getSupportedCurrency(currencies: _currencyInteeface[]) {
  // Define the list of valid currency symbols
  const validSymbols = ['USD', 'GBP', 'EUR', 'NGN', 'XOF', 'XAF', 'GNF', 'RWF', 'GHS', 'TZS', 'UGX'];

  // Filter the array to return only those objects whose currency_symbol is in the validSymbols array
  return currencies.filter(item => validSymbols.includes(item.currency_symbol));
  // .map(item => item.currency_symbol);
  
}

export const currencyLists = getSupportedCurrency(availableCurrencies);


export function getCurrencySymbol(currencyCode: string): string {
  const currencySymbols: { [key: string]: string } = {
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'NGN': '₦',
    'XOF': 'CFA',
    'XAF': 'CFA',
    'GNF': 'FG',
    'RWF': 'FRw',
    'GHS': '₵',
    'TZS': 'TSh',
    'UGX': 'USh'
  };

  return currencySymbols[currencyCode];
}



export const supportCurrencies: currencyInterface[] = [
  {
    currency_code: "USD",
    currency_symbol: "$",
    currency_name: "United States Dollar"
  },
  {
    currency_code: "EUR",
    currency_symbol: "€",
    currency_name: "Euro"
  },
  {
    currency_code: "NGN",
    currency_symbol: "₦",
    currency_name: "Nigerian Naira"
  },
  {
    currency_code: "GHS",
    currency_symbol: "₵",
    currency_name: "Ghanaian Cedi"
  },
  {
    currency_code: "TZS",
    currency_symbol: "TSh",
    currency_name: "Tanzanian Shilling"
  },
  {
    currency_code: "UGX",
    currency_symbol: "USh",
    currency_name: "Ugandan Shilling"
  },
  {
    currency_code: "XOF",
    currency_symbol: "CFA",
    currency_name: "West African CFA Franc"
  },
  {
    currency_code: "XAF",
    currency_symbol: "FCFA",
    currency_name: "Central African CFA Franc"
  }
];

export function getCurrencyByCode(code: string, _currencies = supportCurrencies) {
  return _currencies.find(currency => currency.currency_code === code);
}
