import displayAlert from './displayAlert';
describe('displayAlert', () => {
  jest.useFakeTimers();
  document.body.innerHTML = `
    <button  class="search-btn">Clear Tasks</button>
    `;
  const body = document.body;
  describe('calling displayAlert', () => {
    beforeEach(() => {
      displayAlert();
    });
    it('should display alert', () => {
      expect(body.firstElementChild.className).toMatch(
        'alert'
      );
    });
    it('should remove the alert after 2000 milliseconds', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      jest.advanceTimersByTime(2000);
      expect(body.firstElementChild.className).not.toMatch(
        'alert'
      );
      expect(body.firstElementChild.className).toMatch('search-btn');
    });
  });
});
