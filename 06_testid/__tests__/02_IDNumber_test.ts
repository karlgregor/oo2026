import { IDCode } from '../02_IDNumber';

test("PersonGender", () => {
    expect(new IDCode("50506154917").gender()).toBe("male")
    expect(new IDCode("60506154917").gender()).toBe("female")
})