import { ReservaProducto } from './reserva-producto';

describe('ReservaProducto', () => {
  it('should create an instance', () => {
    expect(new ReservaProducto(1,1,1,1 )).toBeTruthy();
  });
});
