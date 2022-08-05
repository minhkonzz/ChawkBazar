import './Form.css'
import UserInput from '../../../../common/UserInput/UserInput'
import Button from '../../../../common/Button/Button'

const Form = () => {
  return (
    <div className="row">
      <div className="col lg-12 md-12 sm-12">
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <h1>Get in touch</h1>
          </div>  
        </div>
        <div className="row">
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Your name (require)"/>
          </div>
          <div className="col lg-6 md-12 sm-12">
            <UserInput label="Your email (require)"/>
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Subject"/>
          </div>  
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <UserInput label="Message" isTextArea rows={7} />
          </div>
        </div>
        <div className="row">
          <div className="col lg-12 md-12 sm-12">
            <Button text="Send message" w={160} h={60}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form