import { isValidSwedishSSN} from './validate';

test('my id', () => {
    expect(isValidSwedishSSN('8112289874')).toBe(true);
    expect(isValidSwedishSSN('6709199530')).toBe(true);
    expect(isValidSwedishSSN('6709329530')).toBe(false);
})