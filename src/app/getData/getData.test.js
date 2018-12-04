import getData from './getData';
jest.mock('./getData');
describe('getData', () => {
  it('should return', async () => {
    const data = await getData();
    expect(data).toEqual([
      {
        API: 'API for api searching'
      }
    ]);
  });
});