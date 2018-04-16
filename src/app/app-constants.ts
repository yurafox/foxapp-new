export class AppConstants {

  /* TODO перенести/реализовать все подобные сервисы в бекенде api/svc/....*/
  //public static readonly BASE_URL = 'https://mobile.foxtrot.com.ua';
  public static readonly BASE_URL = 'http://localhost:44374';
  public static readonly BASE_PAYMENT_URL = 'https://mobile.foxtrot.com.ua/paymaster/payment';
  public static readonly USE_PRODUCTION = true;
  public static readonly EMAIL_SUBSCRIPTION_ENDPOINT = 'http://www.foxtrot.com.ua/Subscription/Subscription/';
  public static readonly PRODUCT_PAGE_SIZE = 9;
  public static readonly PRODUCT_PAGELINK_SIZE = 5;
  public static readonly LOCALE_DEFAULT_VALUE = 1;
  public static readonly CURRENCY_DEFAULT_VALUE = 4;

  public static readonly MAX_LOAN_AMT = 70000;
  public static readonly MIN_LOAN_AMT = 500;
  public static readonly LOAN_DEFAULT_CURRENCY = 0;

  public static readonly MAX_BONUS_PAYMENT_REST = 1;
  public static readonly BONUS_TO_CURRENCY_RATE = 1;
  public static readonly ACTION_BONUS_TO_CURRENCY_RATE = 0.1;
  public static readonly BONUS_PMT_FOR_PRODUCT_ONLY = true;
}
