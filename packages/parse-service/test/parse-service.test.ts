import * as Parse from 'parse/node';
import { ParseService } from '../src/parse-service';

describe('#count', () => {
  test('should call the count method of the query', async () => {
    const query = new Parse.Query('Test');
    
    const mock = jest.spyOn(query, 'count');
    // @ts-ignore
    mock.mockImplementation(async (params, options) => query);

    const options: Parse.Query.FindOptions = { useMasterKey: true };

    const result = await ParseService.count(query, options);

    expect(mock).toHaveBeenCalledWith(options);
    expect(result).toEqual(query);
  });
});

describe('#fetch', () => {
  test('should call the fetch method of the object', async () => {
    const obj = new Parse.Object('Test');
    
    const mock = jest.spyOn(obj, 'fetch');
    // @ts-ignore
    mock.mockImplementation(async (params, options) => obj);

    const options: Parse.Object.FetchOptions = { useMasterKey: true };

    const result = await ParseService.fetch(obj, options);

    expect(mock).toHaveBeenCalledWith(options);
    expect(result).toEqual(obj);
  });
});

describe('#find', () => {
  test('should call the find method of the query', async () => {
    const obj = new Parse.Query('Test');
    
    const mock = jest.spyOn(obj, 'find');
    // @ts-ignore
    mock.mockImplementation(async (params, options) => obj);

    const options: Parse.Query.FindOptions = { useMasterKey: true };

    const result = await ParseService.find(obj, options);

    expect(mock).toHaveBeenCalledWith(options);
    expect(result).toEqual(obj);
  });
});

describe('#first', () => {
  test('should call the first method of the query', async () => {
    const obj = new Parse.Query('Test');
    
    const mock = jest.spyOn(obj, 'first');
    // @ts-ignore
    mock.mockImplementation(async (params, options) => obj);

    const options: Parse.Object.SaveOptions = { useMasterKey: true };

    const result = await ParseService.first(obj, options);

    expect(mock).toHaveBeenCalledWith(options);
    expect(result).toEqual(obj);
  });
});

describe('#save', () => {
  test('should call the save method of the object', async () => {
    const obj = new Parse.Object('Test');
    
    const mock = jest.spyOn(obj, 'save');
    mock.mockImplementation(async (params, options) => obj);

    const options = { useMasterKey: true };

    const result = await ParseService.save(obj, options);

    expect(mock).toHaveBeenCalledWith(null, options);
    expect(result).toEqual(obj);
  });
}); 

describe('#destroy', () => {
  test('should call the destroy method of the object', async () => {
    const obj = new Parse.Object('Test');
    
    const mock = jest.spyOn(obj, 'destroy');
    mock.mockImplementation(async options => obj);

    const options = { useMasterKey: true };

    const result = await ParseService.destroy(obj, options);

    expect(mock).toHaveBeenCalledWith(options);
    expect(result).toEqual(obj);
  });
});

describe('#each', () => {
  test('should call the each method of the object', async () => {
    const query = new Parse.Query('Test');
    
    const mock = jest.spyOn(query, 'each');
    // @ts-ignore
    mock.mockImplementation(async options => query);

    const callback = jest.fn();
    const options = { useMasterKey: true };

    const result = await ParseService.each(query, callback, options);

    expect(mock).toHaveBeenCalledWith(callback, options);
    expect(result).toEqual(query);
  });
});

