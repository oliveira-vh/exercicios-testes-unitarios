const { expect } = require('@jest/globals');
const juros = require('./juros');

test('Deve retornar juros simples', ()=>{
    const C = 100;
    const i = 0.10;
    const t = 1;
    const jurosEsperados = 10;
    const jurosCalc = juros.jurosSimples(C,i,t);
    expect(jurosCalc).toBe(jurosEsperados);
})

test('Deve retornar montante simples', ()=>{
    const C = 1000;
    const i = 0.10;
    const t = 1;
    const montanteEsperado = 1010;
    const jurosSimples = jest.fn();
    jurosSimples.mockImplementation(() => 10);
    const montanteSimples = juros.pure.montanteSimples({jurosSimples});
    const montante = montanteSimples(C, i, t);
    console.log('montante', montante);
    expect(jurosSimples.mock.calls[0]).toEqual([C,i,t]);
    expect(montante).toBe(montanteEsperado);
});

test('Deve retornar juros compostos', ()=>{
    const C = 100;
    const i = 0.10;
    const t = 1;
    const jurosEsperados = 110.00000000000001;
    const jurosCalc = juros.montanteJurosCompostos(C,i,t);
    expect(jurosCalc).toBe(jurosEsperados);
});

test('Deve retornar montante composto', ()=>{
    const C = 1000;
    const i = 0.10;
    const t = 1;
    const montanteJurosCompostos = jest.fn();
    montanteJurosCompostos.mockImplementation(()=>1100);
    const jurosCompostos = juros.pure.jurosCompostos({montanteJurosCompostos});
    const jurosCalc = jurosCompostos(C,i,t)
    expect(montanteJurosCompostos.mock.calls[0]).toEqual([C,i,t]);
    expect(jurosCalc).toBe(100);
});