import { Producto } from './producto';

describe('Producto', () => {
  it('should create an instance', () => {
    expect(new Producto(1, 'Producto 1','Descripción 1',4, true)).toBeTruthy();
  });
});
