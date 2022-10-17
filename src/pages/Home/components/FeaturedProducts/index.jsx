import './FeaturedProducts.css'
import FeaturedProduct from './FeaturedProduct'
import { useCreatedContext } from '../../../../store/Provider'

const FeaturedProducts = () => {

   const [ state, dispatch ] = useCreatedContext()

   return (
      <div className="col lg-12 md-12 sm-12">
         <div className="row">
            <div className="col lg-12 md-12 sm-12">
               <h1>Featured Products</h1>
            </div>
         </div>
         <div className="row">
            <div className="col lg-6 md-12 sm-12">
               <FeaturedProduct largest data={state?.sectionData[0]}/>
            </div>
            <div className="col lg-6 md-12 sm-12">
               <div className="row">
                  <div className="col lg-6 md-6 sm-12">
                     <FeaturedProduct data={state?.sectionData[1]}/>
                     <FeaturedProduct data={state?.sectionData[2]}/>
                  </div>
                  <div className="col lg-6 md-6 sm-12">
                     <FeaturedProduct data={state?.sectionData[3]}/>
                     <FeaturedProduct data={state?.sectionData[4]}/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeaturedProducts