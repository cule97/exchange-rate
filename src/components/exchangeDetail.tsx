import { useState, useEffect } from 'react';
import styles from './exchangeDetail.module.css';
import { getExchangeRate } from './../api/getExchangeRate';
import { IoSwapVerticalSharp } from 'react-icons/io5';
let Currencydata = [
  'AED',
  'AMD',
  'ANG',
  'ARS',
  'AUD',
  'CAD',
  'CHF',
  'CLP',
  'CUP',
  'CZK',
  'EUR',
  'GEL',
  'JEP',
  'JPY',
  'KRW',
  'NOK',
  'NPR',
  'NZD',
  'PEN',
  'RON',
  'RSD',
  'USD',
  'VES',
];

const ExchangeDetail = () => {
  //입력한 화폐가치
  const [price, setPrice] = useState<number>(1);
  //환율 반영 state값
  const [total, setTotal] = useState<number | undefined>();
  //기준이 되는 나라
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  //환율 적용되는 나라
  const [selectCurrency, setSelectCurrency] = useState<string>('KRW');
  const result =
    total &&
    `${price} ${baseCurrency} = ${(price * total).toFixed(
      2
    )} ${selectCurrency}`;
  //화폐 변환기
  const exchangeRateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setPrice((el)=>el=+event.target.value);
  };
  //기준이 되는 나라 select state
  const baseCurrencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return setBaseCurrency((el)=>el=event.target.value);
  };
  //환율 적용되는 나라 select state
  const selectCurrencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return setSelectCurrency((el)=>el=event.target.value);
  };
  //api get 요청(기준이 되는 나라 변경 시 재랜더링 )
  useEffect(() => {
    const data = async () => {
      const ErData = await getExchangeRate(baseCurrency, selectCurrency);
      setTotal(ErData);
    };
    data();
  }, [baseCurrency, selectCurrency]);
  const mapOption = Currencydata.map((el) => {
    return (
      <option value={el} key={el}>
        {el}
      </option>
    );
  });
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <img
          className={styles.mainIcon}
          src="https://cdn-icons-png.flaticon.com/512/2510/2510667.png"
          alt="mainIcon"
        />
        <h1 className={styles.mainText}>환율 계산기</h1>
        <div className={styles.resultSelect}>
          <select value={baseCurrency} onChange={baseCurrencyHandler}>
            {mapOption}
          </select>
          <input type="number" value={price} min="0" onChange={exchangeRateHandler} />
        </div>
        <div className={styles.swapIcon}>
          <button
            onClick={() => {
              setBaseCurrency(selectCurrency);
              setSelectCurrency(baseCurrency);
            }}
          >
              <IoSwapVerticalSharp size={35} color={'#000'} />
          </button>
          <div className={styles.totalText}>{result}</div>
          <div>{!total && <div>로딩 중</div>}</div>
        </div>
        <div className={styles.resultSelect}>
          <select
            className={styles.selectcurrency}
            value={selectCurrency}
            onChange={selectCurrencyHandler}
          >
            {mapOption}
          </select>
          {total && (
            <input
              disabled
              className={styles.totalResult}
              value={total && (price * total).toFixed(2)}
            ></input>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExchangeDetail;
