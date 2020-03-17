import { ParseCloudClass } from '../..';
import requireKey from '../../decorators/requireKeyDecorator';

@requireKey('testKey', 'testKey38')
// @ts-ignore
class TestClass extends ParseCloudClass {
}

test('Given a new instance: should require the expected keys', () => {
  const instance = new TestClass();
  expect(instance.requiredKeys).toEqual(['testKey', 'testKey38']);
});
