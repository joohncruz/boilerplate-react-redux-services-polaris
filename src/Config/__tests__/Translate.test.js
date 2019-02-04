import translate from '../Translate';

describe('CONFIG: Translate', () => {
  it('should have propertie ptBr', () => {
    expect(translate.ptBr).toBeDefined();
  });
  it('should have propertie ptBr and polaris config', () => {
    expect(translate.ptBr.Polaris).toBeDefined();
  });
  it('should have propertie ptBr and polaris calendar config', () => {
    expect(translate.ptBr.Polaris).toBeDefined();
  });
  it('should have propertie ptBr and polaris calendar config', () => {
    expect(translate.ptBr.Polaris.DatePicker).toBeDefined();

    const {
      ptBr: {
        Polaris: {
          DatePicker: { nextMonth, previousMonth, today },
        },
      },
    } = translate;

    expect(nextMonth).toBeDefined();
    expect(previousMonth).toBeDefined();
    expect(today).toBeDefined();
  });
});
