import axios from "axios";
import src from "./src";

const queryParams = (() => {
  const data = {
    substances: null,
    sectors: null,
    timespan: null,
    error: null
  };

  axios
    .get(src.proxy + src.emissionTable)
    .then(res => {
      console.log("GET Succes (queryParams)");
      console.log(data)
      // format res-data
      // table-cats: substances, sectors, timespan
      data.substances = res.data.variables[0].values.map((item, nth) => ({
        name: res.data.variables[0].valueTexts[nth],
        code: item
      }));

      data.sectors = res.data.variables[1].values.map((item, nth) => ({
        name: res.data.variables[1].valueTexts[nth],
        code: item
      }));

      data.timespan = res.data.variables[3].values;
    })
    // handle get-error
    .catch(error => {
      console.log("GET Fail (queryParams)", error);

      data.error = error;
    });
  return data;
})();



export default queryParams;
