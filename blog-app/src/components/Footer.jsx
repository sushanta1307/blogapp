import React from 'react'
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Your blogs at your Hand</h5>
                <p className="grey-text text-lighten-4">Privacy Policy | Terms and Conditions</p>
              </div>
              <div className="col l4 offset-l2 s12" >
                <SocialIcon url="https://www.instagram.com/_sushanta.senapati_/" target='_blank' style={{margin: '4px'}} />
                <SocialIcon url="mailto:1307senapati@gmail.com" target='_blank' style={{margin: '4px'}} />
                <SocialIcon url="https://www.linkedin.com/in/sushanta-senapati-b089801b4/" target='_blank' style={{margin: '4px'}} />
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2022 Copyright @sushanta.senapati
            {/* <a className="grey-text text-lighten-4 right" href="#!">More Links</a> */}
            </div>
          </div>
        </footer>
  )
}

export default Footer
