import { useContext } from "react";
import Checkbox from "../../../common/components/Checkbox";
import { CatalogContext } from "../../../context/provider/catalog.provider";
import { useSearchParams } from "react-router-dom";

const Filter = ({ data }) => {

   const [ searchParams, setSearchParams ] = useSearchParams();
   const { catalogData, handleFilteredProducts } = useContext(CatalogContext);
   const { filter } = catalogData;

   const selectHandler = async(event, val) => {
      const paramsObj = Object.fromEntries(searchParams.entries());
      const newFilter = { ...filter }; 
      if (event.target.checked) {
         paramsObj[data.urlParam] = paramsObj[data.urlParam] ? paramsObj[data.urlParam] + `p2c${val.optionSlug}` : val.optionSlug;
         newFilter[data.urlParam] = newFilter[data.urlParam] ? [ ...newFilter[data.urlParam], { optionId: val.optionId, optionName: val.optionName } ] : [ { optionId: val.optionId, optionName: val.optionName } ]; 
      }
      else {
         if (paramsObj[data.urlParam].includes("p2c")) {
            paramsObj[data.urlParam] = paramsObj[data.urlParam].replace(
               paramsObj[data.urlParam].includes(`p2c${val.optionSlug}`) ? `p2c${val.optionSlug}` : `${val.optionSlug}p2c`, 
               ""
            );
         }
         else delete paramsObj[data.urlParam];
         if (newFilter[data.urlParam].length === 1) delete newFilter[data.urlParam];
         else newFilter[data.urlParam] = newFilter[data.urlParam].filter((selectedOptId) => selectedOptId !== val.optionId); 
      }
      await handleFilteredProducts(newFilter); 
      setSearchParams(paramsObj);
   }

   return (
      <div className="filter">
         <h4>{data.title}</h4>
         <div className="checkbox-selector"> {
            data.filtersList.map((option, index) => {
               return (
                  <Checkbox 
                     onSelectChange={() => selectHandler}
                     key={index}
                     cbVal={
                        { optionId: option.id, optionSlug: option.slug, optionName: option.name || 
                           (option.min && !option.max 
                           ? `${option.min}-` :
                           option.max && !option.min
                           ? `-${option.max}` : `${option.min}-${option.max}`) } 
                     }>
                     {  option.name || 
                        (option.min && !option.max 
                        ? `Over $${option.min}` :
                        option.max && !option.min 
                        ? `Under $${option.max}` : `$${option.min} - $${option.max}`)
                     }
                  </Checkbox>
               )
            })}
         </div>
      </div>
   )
}

export default Filter 