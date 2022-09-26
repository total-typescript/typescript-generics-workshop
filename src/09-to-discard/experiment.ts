type GetData<
  T extends {
    getData: () => any;
  }
> = ReturnType<T["getData"]>;

type Result = GetData<{
  // ^?
  getData: () => string;
}>;

const runGetData = <U>(config: { getData: () => U }): U => {
  return config.getData();
};

const result = runGetData({
  //  ^?
  getData: () => "123",
});
