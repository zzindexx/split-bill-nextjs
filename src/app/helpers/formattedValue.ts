import { formatValue } from 'react-currency-input-field';
import { FormatValueOptions } from 'react-currency-input-field/dist/components/utils/formatValue';

export const formattedValue = (value: number) => {
    let options: FormatValueOptions = {
        value: value.toFixed(2),
        suffix: '$', 
        groupSeparator:' ', 
        decimalSeparator: '.'
    }
    return formatValue(options);
}