import Slider from './components/Banner'
import Promotions from './components/Promotions'
import BestSellers from './components/BestSellers'
import TopBrands from './components/TopBrands'
import FeaturedProducts from './components/FeaturedProducts'
import NewCollections from './components/NewCollections'
import Contact from './components/Contact'
import getSectionData from '../../utils/fetch'
import { BaseSource } from '../../utils/constants'
import { Provider as HomeSectionProvider } from '../../services/context'
import { setSectionData } from '../../services/redux/actions/home_section.actions'
import { useCreatedContext } from '../../services/context/provider'
import { useEffect, useRef } from 'react'
import HomeSectionReducer, { initialState } from "../../services/redux/store/reducers/home_section.reducer"
import { getAllRecords } from '../../services/firebase/common'
import './index.css'

const Section = (props) => {

  const [ state, dispatch ]  = useCreatedContext(); 
  const { callAPI, rootClassValue } = props.inputs
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]; 
      const isVisible = !!entry?.isIntersecting
      if (isVisible) {
        entry?.target.classList.toggle("visible", isVisible)
        if (callAPI) {
          getSectionData({
            prefix: BaseSource?.BASE_URL, 
            endpoint: callAPI?.endpoint || 'error'
          })
          .then(responseData => {
              dispatch(setSectionData(responseData))
          })
          .catch(err => console.log(err))
          getAllRecords("brands")
          .then(() => {});
        }
        else dispatch(setSectionData(!state.sectionData));
        observer.unobserve(entry?.target);
      }
    }, {
      threshold: 0.4
    });
    observer.observe(sectionRef.current)
  }, [])

  return (
    <section id="sectiond" className={`h-sec row${rootClassValue || ''}`} ref={sectionRef}>
      { props.children }
    </section>
  )
}

// { component: Promotions, handleVisible: () => {}, rootClassValue: ' promotions' },

const Home = () => {

  const sections = [
    { component: Slider }, 
    { component: FeaturedProducts, callAPI: { endpoint: 'featuredproducts' } }, 
    { component: BestSellers, callAPI: { endpoint: 'bestsellers' } },
    { component: NewCollections, rootClassValue: ' new-collections' },
    { component: TopBrands, callAPI: { endpoint: 'topbrands' } },
    { component: Contact, rootClassValue: ' contact' }
  ]

  return (
    <> {
      sections.map((section, index) => {
        const { component: SectionComponent, handleSectionVisible, callAPI, rootClassValue } = section
        return (
          <HomeSectionProvider
            key={index}
            reducer={HomeSectionReducer}
            initialState={initialState}>
            <Section
              inputs={{ handleSectionVisible, callAPI, rootClassValue }}>
              <SectionComponent />
            </Section>
          </HomeSectionProvider>
        )
      })}
    </>
  )
}

export default Home
