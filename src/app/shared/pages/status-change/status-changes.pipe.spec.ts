import { StatusChangesPipe } from './status-changes.pipe';

describe('StatusChangesPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusChangesPipe();
    expect(pipe).toBeTruthy();
  });
});
