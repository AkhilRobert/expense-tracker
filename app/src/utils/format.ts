// polyfill for intl to work in android phones
import 'intl';
import 'intl/locale-data/jsonp/en-IN';

export const formatCurrency = (val: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return formatter.format(val);
};
